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

		list: {
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