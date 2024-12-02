<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer>
	<div class="footer-content">
		<div class="footer-section">
			<h3>Location</h3>
			<p>Lekki Lagos, Nigeria</p>
		</div>
		<div class="footer-section">
			<h3>Hours</h3>
			<p>Monday - Saturday</p>
			<p>9:00 AM - 6:00 PM</p>
		</div>
		<div class="footer-section">
			<h3>Contact</h3>
			<a href="/contact">Get in touch</a>
		</div>
	</div>
	<div class="footer-bottom">
		<p>&copy; {currentYear} Irima's Kitchen. All rights reserved.</p>
	</div>
</footer>

<style lang="scss">
	footer {
		background: #2c3e50;
		color: white;
		padding: 3rem 1rem 1rem;
		margin-top: 4rem;

		.footer-content {
			max-width: 1200px;
			margin: 0 auto;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			gap: 2rem;
			margin-bottom: 2rem;
		}

		.footer-section {
			h3 {
				color: #e67e22;
				margin-bottom: 1rem;
			}

			a {
				color: white;
				text-decoration: none;

				&:hover {
					color: #e67e22;
				}
			}
		}

		.footer-bottom {
			text-align: center;
			padding-top: 2rem;
			border-top: 1px solid rgba(255, 255, 255, 0.1);
		}
	}
</style>
