import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error('Por favor ingresa un correo válido')
      return
    }

    setLoading(true)
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarpassword`
      const response = await axios.post(url, { email })
      toast.success(response?.data?.msg || 'Revisa tu correo para recuperar tu contraseña')
      setEmail('')
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Error enviando solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-6">¿Olvidaste tu contraseña?</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
        <label htmlFor="email" className="block mb-2 font-medium">Correo electrónico</label>
        <input
          type="email"
          id="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
