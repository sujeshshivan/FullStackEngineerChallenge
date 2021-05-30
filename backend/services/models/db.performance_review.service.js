"use strict";
//packages
const DbService = require('moleculer-db');
const SqlAdapter = require('moleculer-db-adapter-sequelize');
const Sequelize = require('sequelize');

module.exports = {
    name: "db.performance_review",
    mixins: [DbService],
    settings: {
        idField: "reviewId",
        //populates: null,
        pageSize: 10,
        maxPageSize: 100,
        maxLimit: -1,
        entityValidator: {},
        populates: {
            userDetails: {
                field: "userId",
                action: "db.user.get",
                params: {
                    fields: ["name", "username", "email"]
                }
            },
            reviewerDetails: {
                field: "reviewerId",
                action: "db.user.get",
                params: {
                    fields: ["name", "username", "email"]
                }
            }
        }
    },
    dependencies: [],
    adapter: new SqlAdapter(process.env.SQL_CONNECTION_STRING, {
        logging: false,
    }),
    model: {
        name: "performance_review",
        define: {
            reviewId: {
                field: "id",
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.UUIDV4
            },
            userId: {
                field: "userId",
                type: Sequelize.STRING,
            },
            reviewerId: {
                field: "reviewer_id",
                type: Sequelize.STRING,
            },
            review: {
                field: "review",
                type: Sequelize.STRING
            },
            isSubmitted: {
                field: "is_submitted",
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