const { Usuario } = require('../conexion/db')

const axios = require('axios')

const validarUsuario = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]

  const auth0Response = await axios.get(
    'https://dev-clppguzk.us.auth0.com/userinfo',
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  )

  if (auth0Response.status !== 200)
    return res.status(400).json({ msg: 'Error de Auth0' })

  const nickname = auth0Response.data.nickname

  const usuario = await Usuario.findOne({
    where: { nickname },
  })

  if (!usuario)
    return res.status(404).json({ msg: 'Auth: Usuario no encontrado' })
}

exports.validarUsuario = validarUsuario
