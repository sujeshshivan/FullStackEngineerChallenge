"use strict";
//packages
const DbService = require('moleculer-db');
const SqlAdapter = require('moleculer-db-adapter-sequelize');
const Sequelize = require('sequelize');

module.exports = {
    name: "db.user",
    mixins: [DbService],
    settings: {},
    dependencies: [],
    adapter: new SqlAdapter(process.env.SQL_CONNECTION_STRING, {
        logging: false,
    }),
    model: {
        name: "user",
        define: {
            userId: {
                field: "id",
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                field: "name",
                type: Sequelize.STRING,
            },
            username: {
                field: "username",
                type: Sequelize.STRING,
            },
            email: {
                field: "email",
                type: Sequelize.STRING
            },
            password: {
                field: "password",
                type: Sequelize.STRING
            },
            age: {
                field: "age",
                type: Sequelize.INTEGER
            },
            userRole: {
                field: "user_role",
                type: Sequelize.INTEGER,
                defaultValue: 2 //1=admin 2-employee
            },
            isDeleted: {
                field: "is_deleted",
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                field: "created_at",
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                field: "updated_at",
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        options: { freezeTableName: true }
    },
    actions: {
        executeQuery: {
            handler(ctx) {
                return this.adapter.db.query(ctx.params.query)
                    .then(([res, metadata]) => res);
            }
        },
        customUpdate: {
            handler(ctx) {
                let { params, where } = ctx.params;
                return this.adapter.db.models.user.update(params, { where: where })
                    .then(([res, metadata]) => res);
            }
        }
    },
    events: {},
    methods: {},
    created() {

    },
    started() {
        if (process.env.db_sync) {
            this.adapter.db.sync({ alter: true }).then(function () {
            });
        }
    },
    stopped() { }
}