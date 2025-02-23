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
	@use '../../styles/variables' as v;

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: v.$spacing-md;
		max-width: 600px;
		margin: 0 auto;
		padding: v.$spacing-lg;
		background-color: v.$bg-primary;
		border-radius: v.$border-radius-lg;
		box-shadow: v.$shadow-md;

		.success-message {
			background: v.$success;
			color: v.$text-light;
			padding: v.$spacing-md;
			border-radius: v.$border-radius-md;
			text-align: center;
		}

		.error-message {
			background: v.$error;
			color: v.$text-light;
			padding: v.$spacing-md;
			border-radius: v.$border-radius-md;
			text-align: center;
		}

		.form-group {
			display: flex;
			flex-direction: column;
			gap: v.$spacing-xs;

			label {
				font-weight: 600;
				color: v.$text-primary;
			}

			input,
			textarea {
				padding: v.$spacing-sm v.$spacing-md;
				border: 1px solid v.$border-color;
				border-radius: v.$border-radius-md;
				font-family: v.$font-primary;
				transition: border-color v.$transition-fast;

				&:focus {
					outline: none;
					border-color: v.$primary-color;
				}

				&:disabled {
					background: v.$text-lighter;
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
			gap: v.$spacing-sm;
			cursor: pointer;

			input[type="checkbox"] {
				width: auto;
				margin: 0;
			}
		}

		.menu-selection {
			margin: v.$spacing-md 0;

			h3 {
				margin-bottom: v.$spacing-md;
				color: v.$text-primary;
			}

			.category-section {
				margin-bottom: v.$spacing-lg;

				h4 {
					margin-bottom: v.$spacing-sm;
					color: v.$text-secondary;
				}
			}

			.menu-items-grid {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
				gap: v.$spacing-md;
			}

			.menu-item-checkbox {
				display: flex;
				flex-direction: column;
				gap: v.$spacing-xs;
				padding: v.$spacing-md;
				border: 1px solid v.$border-color;
				border-radius: v.$border-radius-sm;
				transition: all v.$transition-fast;
				cursor: pointer;

				&:hover {
					background-color: v.$bg-secondary;
				}

				.checkbox-row {
					display: flex;
					align-items: flex-start;
					gap: v.$spacing-sm;

					input[type="checkbox"] {
						margin-top: 0.3rem;
						width: 16px;
						height: 16px;
					}

					.item-name {
						font-weight: 600;
						color: v.$text-primary;
						line-height: v.$line-height-normal;
					}
				}

				.item-description {
					font-size: v.$font-size-sm;
					color: v.$text-secondary;
					line-height: v.$line-height-normal;
				}
			}
		}

		.alert {
			padding: v.$spacing-sm v.$spacing-md;
			border-radius: v.$border-radius-md;
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
			background: v.$primary-color;
			color: v.$text-light;
			padding: v.$spacing-md v.$spacing-lg;
			border: none;
			border-radius: v.$border-radius-md;
			font-family: v.$font-primary;
			font-weight: 700;
			font-size: v.$font-size-base;
			cursor: pointer;
			transition: background-color v.$transition-fast;

			&:hover:not(:disabled) {
				background: v.$primary-dark;
			}

			&:disabled {
				background: v.$text-lighter;
				cursor: not-allowed;
			}
		}
	}
</style>
