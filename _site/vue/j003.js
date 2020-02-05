var app5 = new Vue({
	el: "#app-5",
	data: {
		message: "Note that in this method we update the state of our app without touching the DOM - all DOM manipulations are handled by Vue, and the code you write is focused on the underlying logic.",
		model: "model message"
	},
	methods: {
		reverseMessage: function () {
			this.message = this.message.split("").reverse().join("")
		}
	}
})