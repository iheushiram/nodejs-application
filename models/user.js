const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findById(userId) {
    console.info('userId' + userId)
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (user === null) {
        // throw new Error('User not found');
    }
    console.info('/model/userjs' + user);
    return user;
}

module.exports = {
    findById,
}