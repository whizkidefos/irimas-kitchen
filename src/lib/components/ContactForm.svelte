<script lang="ts">
	import { fade } from 'svelte/transition';
	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let sending = false;
	let success = false;
	let error = '';

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		sending = true;
		error = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, subject, message })
			});

			if (!response.ok) throw new Error('Failed to send message');

			success = true;
			name = '';
			email = '';
			subject = '';
			message = '';
		} catch (err) {
			error = 'Failed to send message. Please try again.';
		} finally {
			sending = false;
		}
	}
</script>

<form on:submit={handleSubmit} class="contact-form">
	{#if success}
		<div class="success-message" in:fade>
			Thank you for your message! We'll get back to you soon.
		</div>
	{/if}

	{#if error}
		<div class="error-message" in:fade>
			{error}
		</div>
	{/if}

	<div class="form-group">
		<label for="name">Name</label>
		<input type="text" id="name" bind:value={name} required disabled={sending} />
	</div>

	<div class="form-group">
		<label for="email">Email</label>
		<input type="email" id="email" bind:value={email} required disabled={sending} />
	</div>

	<div class="form-group">
		<label for="subject">Subject</label>
		<input type="text" id="subject" bind:value={subject} required disabled={sending} />
	</div>

	<div class="form-group">
		<label for="message">Message</label>
		<textarea id="message" bind:value={message} rows="5" required disabled={sending}></textarea>
	</div>

	<button type="submit" disabled={sending}>
		{sending ? 'Sending...' : 'Send Message'}
	</button>
</form>

<style lang="scss">
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		.success-message {
			background: #4caf50;
			color: white;
			padding: 1rem;
			border-radius: 5px;
			text-align: center;
		}

		.error-message {
			background: #f44336;
			color: white;
			padding: 1rem;
			border-radius: 5px;
			text-align: center;
		}

		.form-group {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			label {
				color: #2c3e50;
				font-weight: 500;
			}

			input,
			textarea {
				padding: 0.8rem;
				border: 1px solid #ddd;
				border-radius: 5px;
				font-family: inherit;
				transition: border-color 0.3s ease;

				&:focus {
					outline: none;
					border-color: #e67e22;
				}

				&:disabled {
					background: #f5f5f5;
					cursor: not-allowed;
				}
			}
		}

		button {
			background: #e67e22;
			color: white;
			padding: 1rem;
			border: none;
			border-radius: 5px;
			font-weight: 500;
			cursor: pointer;
			transition: background-color 0.3s ease;

			&:hover:not(:disabled) {
				background: darken(#e67e22, 10%);
			}

			&:disabled {
				background: #ccc;
				cursor: not-allowed;
			}
		}
	}
</style>
