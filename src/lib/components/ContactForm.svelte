<script lang="ts">
	import { slide } from 'svelte/transition';
	import { menuItems } from '$lib/data/menu';
	import type { ContactFormData } from '$lib/types/contact';

	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let isOrder = false;
	let selectedItems: string[] = [];
	let specialInstructions = '';
	let sending = false;
	let error = '';
	let success = '';

	// Group menu items by category
	const menuItemsByCategory = menuItems.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = [];
		}
		acc[item.category].push(item);
		return acc;
	}, {} as Record<string, typeof menuItems>);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		sending = true;
		error = '';
		success = '';

		try {
			const formData: ContactFormData = {
				name,
				email,
				subject: isOrder ? 'New Order' : subject,
				message,
				isOrder,
				selectedItems: isOrder ? selectedItems : undefined,
				specialInstructions: isOrder ? specialInstructions : undefined
			};

			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to send message');
			}

			success = 'Message sent successfully!';
			// Reset form
			name = '';
			email = '';
			subject = '';
			message = '';
			isOrder = false;
			selectedItems = [];
			specialInstructions = '';
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			sending = false;
		}
	}
</script>

<form on:submit={handleSubmit} class="contact-form">
	{#if success}
		<div class="success-message" in:slide>
			{success}
		</div>
	{/if}

	{#if error}
		<div class="error-message" in:slide>
			{error}
		</div>
	{/if}

	<div class="form-group">
		<label class="checkbox-label">
			<input
				type="checkbox"
				bind:checked={isOrder}
				disabled={sending}
			/>
			<span>I want to place an order</span>
		</label>
	</div>

	<div class="form-group">
		<label for="name">Name</label>
		<input type="text" id="name" bind:value={name} required disabled={sending} />
	</div>

	<div class="form-group">
		<label for="email">Email</label>
		<input type="email" id="email" bind:value={email} required disabled={sending} />
	</div>

	{#if !isOrder}
		<div class="form-group" transition:slide>
			<label for="subject">Subject</label>
			<input type="text" id="subject" bind:value={subject} required disabled={sending} />
		</div>
	{:else}
		<div class="menu-selection" transition:slide>
			<h3>Select Menu Items</h3>
			{#each Object.entries(menuItemsByCategory) as [category, items]}
				<div class="category-section">
					<h4>{category}</h4>
					<div class="menu-items-grid">
						{#each items as item}
							<label class="menu-item-checkbox">
								<div class="checkbox-row">
									<input
										type="checkbox"
										value={item.name}
										bind:group={selectedItems}
										disabled={sending}
									/>
									<span class="item-name">{item.name}</span>
								</div>
								<span class="item-description">{item.description}</span>
							</label>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="form-group" transition:slide>
			<label for="specialInstructions">Special Instructions</label>
			<textarea
				id="specialInstructions"
				bind:value={specialInstructions}
				rows="4"
				placeholder="Any special requests or dietary requirements?"
				disabled={sending}
			></textarea>
		</div>
	{/if}

	<div class="form-group">
		<label for="message">Additional Message</label>
		<textarea
			id="message"
			bind:value={message}
			rows="5"
			required
			disabled={sending}
			placeholder={isOrder ? 'Any other details about your order?' : 'Your message'}
		></textarea>
	</div>

	<button type="submit" disabled={sending || (isOrder && selectedItems.length === 0)}>
		{sending ? 'Sending...' : isOrder ? 'Place Order' : 'Send Message'}
	</button>
</form>

<style lang="scss">
  @use '../../styles/variables' as *;

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: $spacing-md;
		max-width: 600px;
		margin: 0 auto;
		padding: $spacing-lg;
		background-color: $bg-primary;
		border-radius: $border-radius-lg;
		box-shadow: $shadow-md;

		.success-message {
			background: $success;
			color: $text-light;
			padding: $spacing-md;
			border-radius: $border-radius-md;
			text-align: center;
		}

		.error-message {
			background: $error;
			color: $text-light;
			padding: $spacing-md;
			border-radius: $border-radius-md;
			text-align: center;
		}

		.form-group {
			display: flex;
			flex-direction: column;
			gap: $spacing-xs;

			label {
				font-weight: 600;
				color: $text-primary;
			}

			input,
			textarea {
				padding: $spacing-sm $spacing-md;
				border: 1px solid $border-color;
				border-radius: $border-radius-md;
				font-family: $font-primary;
				transition: border-color $transition-fast;

				&:focus {
					outline: none;
					border-color: $primary-color;
				}

				&:disabled {
					background: $text-lighter;
					cursor: not-allowed;
				}
			}

			textarea {
				min-height: 120px;
				resize: vertical;
			}
		}

		.checkbox-label {
			display: flex;
			align-items: center;
			gap: $spacing-sm;
			cursor: pointer;

			input[type="checkbox"] {
				width: auto;
				margin: 0;
			}
		}

		.menu-selection {
			margin: $spacing-md 0;

			h3 {
				margin-bottom: $spacing-md;
				color: $text-primary;
			}

			.category-section {
				margin-bottom: $spacing-lg;

				h4 {
					margin-bottom: $spacing-sm;
					color: $text-secondary;
				}
			}

			.menu-items-grid {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
				gap: $spacing-md;
			}

			.menu-item-checkbox {
				display: flex;
				flex-direction: column;
				gap: $spacing-xs;
				padding: $spacing-md;
				border: 1px solid $border-color;
				border-radius: $border-radius-sm;
				transition: all $transition-fast;
				cursor: pointer;

				&:hover {
					background-color: $bg-secondary;
				}

				.checkbox-row {
					display: flex;
					align-items: flex-start;
					gap: $spacing-sm;

					input[type="checkbox"] {
						margin-top: 0.3rem;
						width: 16px;
						height: 16px;
					}

					.item-name {
						font-weight: 600;
						color: $text-primary;
						line-height: $line-height-normal;
					}
				}

				.item-description {
					font-size: $font-size-sm;
					color: $text-secondary;
					line-height: $line-height-normal;
				}
			}
		}

		.alert {
			padding: $spacing-sm $spacing-md;
			border-radius: $border-radius-md;
			font-weight: 500;

			&.alert-error {
				background-color: #fee2e2;
				color: #991b1b;
			}

			&.alert-success {
				background-color: #dcfce7;
				color: #166534;
			}
		}

		button {
			background: $primary-color;
			color: $text-light;
			padding: $spacing-md $spacing-lg;
			border: none;
			border-radius: $border-radius-md;
			font-family: $font-primary;
			font-weight: 700;
			font-size: $font-size-base;
			cursor: pointer;
			transition: background-color $transition-fast;

			&:hover:not(:disabled) {
				background: $primary-dark;
			}

			&:disabled {
				background: $text-lighter;
				cursor: not-allowed;
			}
		}
	}
</style>
