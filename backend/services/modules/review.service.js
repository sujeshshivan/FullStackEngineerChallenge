module.exports = {

	name: "review",
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

		adminlist: {
			params: {
				page: { type: "number" },
				pageSize: { type: "number" },
			},
			async handler(ctx) {
				return ctx.call("db.performance_review.list", {
					// sort: "-createdAt",
					page: ctx.params.page,
					pageSize: ctx.params.pageSize
				}).then((result) => {
					if (result)
						return ({ status: "success", mesage: "review list", result: result });
					else
						return ({ status: "error", mesage: "Sorry, fetch review list failed", result: null });
				}).catch((err) => {
					return ({ status: "error", mesage: "Sorry, fetch review list failed", result: err });
				});;
			}
		},

		employeelist: {
			params: {
				page: { type: "number" },
				pageSize: { type: "number" },
				userId: { type: "string" },
			},
			async handler(ctx) {
				return ctx.call("db.performance_review.list", {
					// sort: "-createdAt",
					query: {
						reviewerId: ctx.params.userId
					},
					page: ctx.params.page,
					pageSize: ctx.params.pageSize
				}).then((result) => {
					if (result)
						return ({ status: "success", mesage: "review list", result: result });
					else
						return ({ status: "error", mesage: "Sorry, fetch review list failed", result: null });
				}).catch((err) => {
					return ({ status: "error", mesage: "Sorry, fetch review list failed", result: err });
				});;
			}
		},

		create: {
			params: {
				userId: { type: "string" },
				reviewerId: { type: "string" },
			},
			async handler(ctx) {
				return ctx.call("db.performance_review.find", { query: { userId: ctx.params.userId, reviewerId: ctx.params.reviewerId, } }).then((result) => {
					if (result && result.length) {
						return ({ status: "error", mesage: "Sorry, Review already eixts", result: { user_id: result[0] } });
					} else {
						return ctx.call("db.performance_review.create", ctx.params).then((result) => {
							if (result)
								return ({ status: "success", mesage: "review created successfully", result: result });
							else
								return ({ status: "error", mesage: "Sorry, review creation failed", result: null });
						}).catch((error) => {
							return ({ status: "error", mesage: "review creation failed", result: error });
						});
					}
				}).catch((err) => {
					return ({ status: "error", mesage: "review creation failed", result: err });
				});
			}
		},

		update: {
			params: {
				userId: { type: "string" },
				reviewerId: { type: "string" },
				review: { type: "string" },
				isSubmitted: { type: "boolean" }
			},
			async handler(ctx) {
				return ctx.call('db.performance_review.update', ctx.params).then((result) => {
					if (result)
						return ({ status: "success", mesage: "Review completed successfully", result: result });
					else
						return ({ status: "error", mesage: "Sorry, Review updation failed", result: null });
				}).catch((error) => {
					return ({ status: "error", mesage: "Review updation failed", result: error });
				});

			}
		},

		delete: {
			params: {
				reviewId: { type: "string" }
			},
			async handler(ctx) {
				ctx.params.isDeleted = true;
				return ctx.call('db.performance_review.remove', ctx.params).then((result) => {
					if (result)
						return ({ status: "success", mesage: "review deleted successfully", result: result });
					else
						return ({ status: "error", mesage: "Sorry, review deletion failed", result: null });
				}).catch((error) => {
					return ({ status: "error", mesage: "review deletion failed", result: error });
				});
			}
		},

		get: {
			params: {
				reviewId: { type: "string" }
			},
			async handler(ctx) {
				ctx.params.isDeleted = true;
				return ctx.call('db.performance_review.get', ctx.params).then((result) => {
					if (result)
						return ({ status: "success", mesage: "review details ", result: result });
					else
						return ({ status: "error", mesage: "Sorry, review details get failed", result: null });
				}).catch((error) => {
					return ({ status: "error", mesage: "review details get failed", result: error });
				});
			}
		},
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