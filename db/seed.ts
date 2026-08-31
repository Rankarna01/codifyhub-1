import { createClient } from '@supabase/supabase-js'
import { db, settings, projects, orders } from './index'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY tidak ditemukan.')
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function seed() {
  console.log('🌱 Memulai proses seeding data...')

  // 1. Seed Admin User ke Supabase Auth
  const adminEmail = 'admin@egmail.com'
  const adminPassword = 'password123'

  console.log(`👤 Mendaftarkan admin user: ${adminEmail}`)

  // Cek apakah user sudah ada
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers()

  if (listError) {
    console.error('Gagal membaca list user:', listError.message)
  } else {
    const existingUser = users?.find(u => u.email === adminEmail)

    if (existingUser) {
      console.log('ℹ️ Admin user sudah ada, memperbarui password...')
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        existingUser.id,
        {
          password: adminPassword,
          email_confirm: true,
        }
      )
      if (updateError) console.error('Gagal update admin:', updateError.message)
      else console.log('✅ Password admin berhasil diperbarui.')
    } else {
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: { role: 'admin', name: 'Super Admin' },
      })
      if (createError) console.error('Gagal membuat admin:', createError.message)
      else console.log(`✅ Admin user berhasil dibuat: ${newUser.user?.email}`)
    }
  }

  // 2. Seed Settings Default
  console.log('⚙️ Mengisi data settings default...')
  const defaultSettings = [
    { key: 'site_name', value: 'CodifyHub.id' },
    { key: 'wa_number', value: '6281234567890' },
    { key: 'company_email', value: 'contact@codifyhub.id' },
    { key: 'tagline', value: 'Solusi Pembuatan Website & Aplikasi Modern' },
  ]

  for (const s of defaultSettings) {
    await db.insert(settings).values({
      key: s.key,
      value: s.value,
      updated_at: new Date(),
    }).onConflictDoUpdate({
      target: settings.key,
      set: { value: s.value, updated_at: new Date() }
    })
  }
  console.log('✅ Settings berhasil di-seed.')

  // 3. Seed Sample Projects
  console.log('🚀 Mengisi data sample projects...')
  const sampleProjects = [
    {
      title: 'ERP & Sistem Manajemen Gudang',
      description: 'Sistem terintegrasi untuk inventory tracking, multi-warehouse, dan laporan laba rugi otomatis.',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
      client_name: 'PT Logistik Mandiri',
      link: 'https://codifyhub.id',
    },
    {
      title: 'Platform E-Commerce & POS Mobile',
      description: 'Aplikasi toko online dan Point of Sales kasir dengan pembayaran QRIS serta notifikasi WhatsApp.',
      image_url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=60',
      client_name: 'CV Nusantara Retail',
      link: 'https://codifyhub.id',
    },
    {
      title: 'Company Profile & Booking System',
      description: 'Landing page premium berkecepatan tinggi dengan integrasi calendar schedule dan WhatsApp live chat.',
      image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60',
      client_name: 'Artha Solusi Utama',
      link: 'https://codifyhub.id',
    }
  ]

  for (const p of sampleProjects) {
    await db.insert(projects).values(p)
  }
  console.log('✅ Sample projects berhasil di-seed.')

  // 4. Seed Sample Orders
  console.log('📋 Mengisi data sample orders...')
  const sampleOrders = [
    {
      customer_name: 'Budi Santoso',
      email: 'budi@gmail.com',
      whatsapp: '6281298765432',
      service_type: 'Website Company Profile',
      requirements: 'Butuh landing page modern untuk perusahaan konstruksi lengkap dengan portofolio proyek.',
      status: 'Pending',
    },
    {
      customer_name: 'Siti Rahmawati',
      email: 'siti@gmail.com',
      whatsapp: '6281356789012',
      service_type: 'Sistem Informasi Kustom',
      requirements: 'Aplikasi inventaris barang dan laporan penjualan bulanan export excel.',
      status: 'DP',
    },
    {
      customer_name: 'Ahmad Fauzi',
      email: 'ahmad@startup.co.id',
      whatsapp: '6287812345678',
      service_type: 'Aplikasi Web & Mobile',
      requirements: 'Platform marketplace mini dengan payment gateway Midtrans dan notifikasi WA.',
      status: 'Dikerjakan',
    }
  ]

  for (const o of sampleOrders) {
    await db.insert(orders).values(o)
  }
  console.log('✅ Sample orders berhasil di-seed.')

  console.log('\n🎉 SEEDING SELESAI!')
  console.log('-------------------------------------------')
  console.log('🔑 KREDENSIAL LOGIN ADMIN:')
  console.log(`📧 Email    : ${adminEmail}`)
  console.log(`🔒 Password : ${adminPassword}`)
  console.log('🔗 URL Login: http://localhost:3000/admin/login')
  console.log('-------------------------------------------')
}

seed().catch(err => {
  console.error('❌ Gagal menjalankan seeder:', err)
  process.exit(1)
})
