'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Plus, Pencil, Trash2, ExternalLink, X, Save, Image, Loader2 } from 'lucide-react'
import { Toast, confirmDelete } from '@/lib/swal'
import { ProjectGridSkeleton, ImageScrollCard } from '@/components/ui'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  second_image_url?: string
  client_name: string
  link: string
  created_at: string
}

const emptyForm = { title: '', description: '', image_url: '', second_image_url: '', client_name: '', link: '' }

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [secondImageFile, setSecondImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/projects')
      const json = await res.json()
      if (res.ok) {
        setProjects(json.data ?? [])
      } else {
        // Fallback to Supabase client if direct DB not configured
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
        setProjects(data ?? [])
      }
    } catch {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
      setProjects(data ?? [])
    } finally {
      setLoading(false)
    }
  }

  const openAdd = () => {
    setForm(emptyForm)
    setEditId(null)
    setImageFile(null)
    setSecondImageFile(null)
    setShowForm(true)
  }

  const openEdit = (p: Project) => {
    setForm({
      title: p.title,
      description: p.description,
      image_url: p.image_url,
      second_image_url: p.second_image_url ?? '',
      client_name: p.client_name,
      link: p.link ?? ''
    })
    setEditId(p.id)
    setImageFile(null)
    setSecondImageFile(null)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditId(null)
    setImageFile(null)
    setSecondImageFile(null)
  }

  const handleSave = async () => {
    if (!form.title) return
    setSaving(true)
    
    let uploadedUrl = form.image_url
    if (imageFile) {
      try {
        const uploadData = new FormData()
        uploadData.append('file', imageFile)
        uploadData.append('bucket', 'projects')

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        })

        const uploadJson = await uploadRes.json()
        if (!uploadRes.ok || !uploadJson.url) {
          throw new Error(uploadJson.error || 'Gagal upload gambar ke Supabase Storage!')
        }

        uploadedUrl = uploadJson.url
      } catch (uploadErr: any) {
        Toast.fire({ icon: 'error', title: uploadErr.message || 'Gagal upload gambar utama!' })
        setSaving(false)
        return
      }
    }

    let uploadedSecondUrl = form.second_image_url
    if (secondImageFile) {
      try {
        const uploadData = new FormData()
        uploadData.append('file', secondImageFile)
        uploadData.append('bucket', 'projects')

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        })

        const uploadJson = await uploadRes.json()
        if (!uploadRes.ok || !uploadJson.url) {
          throw new Error(uploadJson.error || 'Gagal upload gambar kedua ke Supabase Storage!')
        }

        uploadedSecondUrl = uploadJson.url
      } catch (uploadErr: any) {
        Toast.fire({ icon: 'error', title: uploadErr.message || 'Gagal upload gambar layar kedua!' })
        setSaving(false)
        return
      }
    }

    const payload = {
      ...form,
      image_url: uploadedUrl,
      second_image_url: uploadedSecondUrl || null
    }
    
    try {
      const url = editId ? `/api/projects/${editId}` : '/api/projects'
      const method = editId ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        // Fallback to Supabase client
        if (editId) {
          const { error } = await supabase.from('projects').update(payload).eq('id', editId)
          if (error) throw new Error(error.message)
        } else {
          const { error } = await supabase.from('projects').insert([payload])
          if (error) throw new Error(error.message)
        }
      }

      Toast.fire({ icon: 'success', title: editId ? 'Project diupdate!' : 'Project ditambahkan!' })
      await fetchProjects()
      closeForm()
    } catch (err: any) {
      Toast.fire({ icon: 'error', title: err.message || 'Gagal menyimpan data!' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDelete('Hapus project ini?')
    if (!isConfirmed) return
    
    setDeletingId(id)
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const { error } = await supabase.from('projects').delete().eq('id', id)
        if (error) throw new Error(error.message)
      }
      Toast.fire({ icon: 'success', title: 'Project dihapus!' })
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch (err: any) {
      Toast.fire({ icon: 'error', title: err.message || 'Gagal menghapus project!' })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header action */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total <span className="font-bold text-gray-800">{projects.length}</span> project terdaftar</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#0A192F] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-900 transition shadow-sm cursor-pointer">
          <Plus size={16} /> Tambah Project
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <ProjectGridSkeleton count={6} mode="admin" />
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
          <FolderIcon />
          <p className="text-gray-400 text-sm font-medium mt-3">Belum ada project</p>
          <p className="text-gray-300 text-xs mt-1">Klik &quot;Tambah Project&quot; untuk mulai mengisi portofolio</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                {p.image_url ? (
                  <ImageScrollCard
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-full"
                    speed={220}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover/scrollcard:bg-black/25 transition duration-300 flex items-center justify-center gap-3 opacity-0 group-hover/scrollcard:opacity-100 z-20">
                      <button onClick={() => openEdit(p)} className="bg-white text-gray-800 p-2 rounded-xl shadow-md hover:bg-gray-50 transition cursor-pointer">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={deletingId === p.id} className="bg-red-500 text-white p-2 rounded-xl shadow-md hover:bg-red-600 transition cursor-pointer">
                        {deletingId === p.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </ImageScrollCard>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image size={28} className="text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{p.title}</h3>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition flex-shrink-0">
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                  {p.client_name && <p className="text-[10px] text-blue-600 font-semibold mb-1.5 bg-blue-50 inline-block px-2 py-0.5 rounded-full">{p.client_name}</p>}
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{p.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && closeForm()}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 text-base">{editId ? 'Edit Project' : 'Tambah Project Baru'}</h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition cursor-pointer"><X size={18} /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Nama Project *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" placeholder="Sistem Informasi ..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Nama Klien</label>
                <input value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" placeholder="PT. / CV. / ..." />
              </div>
              
              {/* Gambar Project (Full Page Screenshot) */}
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                  Gambar / Full-Page Screenshot Web (Scroll Otomatis saat Kursor Mengarah)
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0])
                  }} 
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" 
                />
                <p className="text-[11px] text-gray-400 mt-1">Tip: Upload screenshot website memanjang ke bawah (full-page) untuk efek auto-scroll mulus sampai footer saat di-hover kursor.</p>
                {form.image_url && !imageFile && <p className="text-[10px] text-gray-500 mt-1 truncate">File saat ini: {form.image_url}</p>}
                {imageFile && <p className="text-[10px] text-blue-500 mt-1 truncate">Akan diupload: {imageFile.name}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Link Demo (Opsional)</label>
                <input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Deskripsi</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none"
                  placeholder="Jelaskan fitur dan teknologi yang digunakan..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={closeForm} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer">Batal</button>
              <button onClick={handleSave} disabled={saving || !form.title}
                className="flex-1 py-2.5 rounded-xl bg-[#0A192F] text-white text-sm font-semibold hover:bg-gray-900 transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer">
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FolderIcon() {
  return (
    <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center">
      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      </svg>
    </div>
  )
}
