const db = require('../db')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('select * from usuario')

    return res.status(200).json({
      success: true,
      usuario: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.register = async (req, res) => {
  const {nombre, email, contraseña,direccion, telefono } = req.body
  try {
    const hashedPassword = await hash(contraseña, 10)

    await db.query('insert into usuario(nombre, email,contraseña, direccion, telefono) values ($1 , $2, $3, $4, $5)', [
      nombre,
      email,
      hashedPassword,
      direccion, 
      telefono,
    ])

    return res.status(201).json({
      success: true,
      message: 'The registraion was succefull',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.login = async (req, res) => {
  let usuario = req.usuario

  let payload = {
    id: usuario.id,
    email: usuario.email,
  }

  try {
    const token = await sign(payload, SECRET)

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}
