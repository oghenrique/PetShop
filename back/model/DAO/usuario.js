const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertUser = async function(novosDados) {

    try {
        let sql = `INSERT INTO tbl_usuario (`

        const keys = Object.keys(novosDados)
        const values = Object.values(novosDados)
        let placeholders = ''
        keys.forEach((key, index) => {
            if (values[index] !== undefined && values[index] !== null) {
                sql += `${key}`
                placeholders += `?`
                if (index !== keys.length - 1) {
                    sql += `, `
                    placeholders += `, `
                }
            }
        })
        sql += `) VALUES (${placeholders})`

        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql, values)

        if (result) return result
        else return false
    } catch (error) {
        return false
    }

}

const getId = async function() {
    try {
        const sqlGet = 'select cast(id as decimal) as id from tbl_usuario order by id desc limit 1'

        let resultGet = await prisma.$queryRawUnsafe(sqlGet)

        if (resultGet) {
            return resultGet
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectUser = async function() {
    try {
        let sql = 'select * from tbl_usuario'

        let rsUser = await prisma.$queryRawUnsafe(sql)

        return rsUser

    } catch (error) {
        return false
    }
}

const validaUser = async function(dados) {

    try {
        let sql = `select * from tbl_usuario where email = '${dados}'`

        let rsUser = await prisma.$queryRawUnsafe(sql)

        return rsUser
    } catch (error) {
        return false
    }

}

module.exports = {
    insertUser,
    getId,
    selectUser,
    validaUser
}