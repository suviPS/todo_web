const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD, {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const User = sequelize.define("Users", {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    jwt: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
module.exports.User = User;

const ToDo = sequelize.define("Todos", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});
module.exports.ToDo = ToDo;

User.hasMany(ToDo);

module.exports.addUser = async function(email, password) {
    try {
        await sequelize.sync();
        return await User.create({
            email: email,
            password: password
        });
    } catch (error) {
        console.error(error)
    }
}

module.exports.findUser = async function(email) {
    try {
        await sequelize.sync();
        return await User.findOne({
            where: {
                email: email
            }
        });
    } catch (error) {
        console.error(error)
    }
}

module.exports.updateJwt = async function(user, jwt) {
    await user.update({
        jwt: jwt
    });
}

module.exports.createTodo = async function(userId, content) {
    try {
        await sequelize.sync();
        return await ToDo.create({
            content: content,
            UserId: userId,
            completed: false
        });
    } catch (error) {
        console.error(error)
    }
}

module.exports.completeTodo = async function(todoId) {
    try {
        await sequelize.sync();
        const todo = await ToDo.findOne({
            where: {
                id: todoId
            }
        });
        return await todo.update({
            completed: true
        });
    } catch (error) {
        console.error(error)
    }
}

module.exports.deleteTodo = async function(id) {
    try {
        await sequelize.sync();
        return await ToDo.destroy({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error(error)
    }
}

module.exports.findTodos = async function(userId) {
    try {
        await sequelize.sync();
        return await ToDo.findAll({
            where: {
                userId: userId
            }
        });
    } catch (error) {
        console.error(error)
    }
}