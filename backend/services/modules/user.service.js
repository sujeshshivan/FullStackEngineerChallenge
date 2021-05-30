module.exports = {

	name: "user",
	version: 1,

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	actions: {

		list: {
			params: {
				page: { type: "number" },
				pageSize: { type: "number" },
			},
			async handler(ctx) {
				return ctx.call("db.user.list", {
					// sort: "-createdAt",
					page: ctx.params.page,
					pageSize: ctx.params.pageSize
				}).then((result) => {
					if (result)
						return ({ status: "success", mesage: "user list", result: result });
					else
						return ({ status: "error", mesage: "Sorry, fetch user list failed", result: null });
				}).catch((err) => {
					return ({ status: "error", mesage: "Sorry, fetch user list failed", result: err });
				});;
			}
		},


		create: {
			params: {
				password: { type: "string" },
				name: { type: "string" },
				username: { type: "string" },
				email: { type: "string" }
			},
			async handler(ctx) {
				return ctx.call("db.user.find", { query: { username: ctx.params.username, } }).then((result) => {
					if (result && result.length) {
						return ({ status: "error", mesage: "Sorry, username already eixts", result: { user_id: result[0] } });
					} else {
						return ctx.call("db.user.create", ctx.params).then((result) => {
							if (result)
								return ({ status: "success", mesage: "user created successfully", result: result });
							else
								return ({ status: "error", mesage: "Sorry, user creation failed", result: null });
						}).catch((error) => {
							return ({ status: "error", mesage: "user creation failed", result: error });
						});
					}
				}).catch((err) => {
					return ({ status: "error", mesage: "user creation failed", result: err });
				});
			}
		},

		update: {
			params: {
				password: { type: "string" },
				name: { type: "string" },
				username: { type: "string" },
				email: { type: "string" },
				userId: { type: "string" },
				age: { type: "number" }
			},
			async handler(ctx) {
				ctx.params.id = ctx.params.userId;
				return ctx.call('db.user.update', ctx.params).then((result) => {
					if (result)
						return ({ status: "success", mesage: "user updated successfully", result: result });
					else
						return ({ status: "error", mesage: "Sorry, user updation failed", result: null });
				}).catch((error) => {
					return ({ status: "error", mesage: "user updation failed", result: error });
				});

			}
		},

		delete: {
			params: {
				userId: { type: "string" }
			},
			async handler(ctx) {
				ctx.params.isDeleted = true;
				ctx.params.id = ctx.params.userId;
				return ctx.call('db.user.remove', ctx.params).then((result) => {
					return ({ status: "success", mesage: "user deleted successfully", result: result });
				}).catch((error) => {
					return ({ status: "error", mesage: "user deletion failed", result: error });
				});
			}
		},

		get: {
			params: {
				userId: { type: "string" }
			},
			async handler(ctx) {
				ctx.params.isDeleted = true;
				return ctx.call('db.user.get', ctx.params).then((result) => {
					if (result)
						return ({ status: "success", mesage: "user details ", result: result });
					else
						return ({ status: "error", mesage: "Sorry, user details get failed", result: null });
				}).catch((error) => {
					return ({ status: "error", mesage: "user details get failed", result: error });
				});
			}
		},

		login: {
			params: {
				password: { type: "string" },
				username: { type: "string" },
			},
			handler(ctx) {
				return ctx.call("db.user.find", { query: { username: ctx.params.username, password: ctx.params.password } }).then((result) => {
					if (result && result.length) {
						return ({ status: "error", mesage: "User Exist", result: result });
					} else {
						return ({ status: "success", mesage: "User not found", result: result });
					}
				}).catch((err) => {
					return ({ status: "error", mesage: "User not found", result: err });
				});
			}
		}
	},


	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}



}