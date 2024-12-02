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
		gap: $spacing-lg;

		.success-message {
			background: $success-color;
			color: white;
			padding: $spacing-md;
			border-radius: $border-radius;
			text-align: center;
		}

		.error-message {
			background: $error-color;
			color: white;
			padding: $spacing-md;
			border-radius: $border-radius;
			text-align: center;
		}

		.form-group {
			display: flex;
			flex-direction: column;
			gap: $spacing-xs;

			label {
				color: $text-color;
				font-weight: 500;
			}

			input,
			textarea {
				padding: $spacing-sm;
				border: 1px solid $border-color;
				border-radius: $border-radius;
				font-family: inherit;
				transition: border-color $transition-default;

				&:focus {
					outline: none;
					border-color: $primary-color;
				}

				&:disabled {
					background: $background-light;
					cursor: not-allowed;
				}
			}
		}

		button {
			background: $primary-color;
			color: white;
			padding: $spacing-md;
			border: none;
			border-radius: $border-radius;
			font-weight: 500;
			cursor: pointer;
			transition: background-color $transition-default;

			&:hover:not(:disabled) {
				background: $primary-dark;
			}

			&:disabled {
				background: $disabled-color;
				cursor: not-allowed;
			}
		}
	}
</style>
