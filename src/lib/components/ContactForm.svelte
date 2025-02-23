<script lang="ts">
	import { fade } from 'svelte/transition';
	import { menuItems } from '$lib/data/menu';
	
	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let isOrder = false;
	let selectedItems: string[] = [];
	let specialInstructions = '';
	let sending = false;
	let success = false;
	let error = '';

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

		try {
			const formData = {
				name,
				email,
				subject: isOrder ? 'Food Order' : subject,
				message: isOrder ? `Selected Items:\n${selectedItems.join('\n')}\n\nSpecial Instructions:\n${specialInstructions}\n\n${message}` : message,
				...(isOrder && { isOrder, selectedItems, specialInstructions })
			};

			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) throw new Error('Failed to send message');

			success = true;
			name = '';
			email = '';
			subject = '';
			message = '';
			isOrder = false;
			selectedItems = [];
			specialInstructions = '';
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
			Thank you for your {isOrder ? 'order' : 'message'}! We'll get back to you soon.
		</div>
	{/if}

	{#if error}
		<div class="error-message" in:fade>
			{error}
		</div>
	{/if}

	<div class="form-group">
		<label>
			<input type="checkbox" bind:checked={isOrder} disabled={sending} />
			I want to place an order
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
		<div class="form-group">
			<label for="subject">Subject</label>
			<input type="text" id="subject" bind:value={subject} required disabled={sending} />
		</div>
	{:else}
		<div class="menu-selection">
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

		<div class="form-group">
			<label for="specialInstructions">Special Instructions</label>
			<textarea
				id="specialInstructions"
				bind:value={specialInstructions}
				rows="3"
				disabled={sending}
				placeholder="Any special requests or dietary requirements?"
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
	@import '../../styles/variables';

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: $spacing-lg;
		max-width: 800px;
		margin: 0 auto;

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
				display: block;
				margin-bottom: $spacing-xs;
				color: $text-primary;
				font-family: $font-primary;
				font-weight: 600;
			}

			input, textarea {
				width: 100%;
				padding: $spacing-md;
				border: 1px solid $border-color;
				border-radius: $border-radius-md;
				font-family: $font-primary;
				font-size: $font-size-base;
				color: $text-primary;
				background-color: $bg-primary;
				transition: all 0.3s ease;

				&:focus {
					outline: none;
					border-color: $primary-color;
				}

				&:disabled {
					background-color: $bg-secondary;
					border-color: $border-color-light;
					cursor: not-allowed;
				}
			}

			textarea {
				min-height: 120px;
				resize: vertical;
			}
		}

		.menu-selection {
			background: $bg-secondary;
			padding: $spacing-lg;
			border-radius: $border-radius-md;
			margin-bottom: $spacing-lg;
			
			h3 {
				color: $text-primary;
				margin-bottom: $spacing-md;
				font-size: $font-size-xl;
				font-weight: 600;
			}

			.category-section {
				margin-bottom: $spacing-xl;

				&:last-child {
					margin-bottom: 0;
				}

				h4 {
					color: $primary-color;
					margin-bottom: $spacing-md;
					font-size: $font-size-lg;
					font-weight: 600;
					display: flex;
					align-items: center;
					gap: $spacing-xs;

					&::after {
						content: '';
						flex: 1;
						height: 2px;
						background: linear-gradient(to right, $primary-color, transparent);
						margin-left: $spacing-sm;
					}
				}

				.menu-items-grid {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
					gap: $spacing-md;
				}

				.menu-item-checkbox {
					background: $bg-primary;
					padding: $spacing-md;
					border-radius: $border-radius-md;
					display: flex;
					flex-direction: column;
					gap: $spacing-xs;
					cursor: pointer;
					transition: transform 0.2s ease, box-shadow 0.2s ease;

					&:hover {
						transform: translateY(-2px);
						box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
					}

					.checkbox-row {
						display: flex;
						align-items: center;
						gap: $spacing-xs;

						input[type="checkbox"] {
							width: 18px;
							height: 18px;
							margin: 0;
							cursor: pointer;

							&:checked {
								accent-color: $primary-color;
							}
						}

						.item-name {
							font-weight: 600;
							color: $text-primary;
						}
					}

					.item-description {
						color: $text-secondary;
						font-size: $font-size-sm;
						line-height: 1.4;
						margin-left: calc(18px + #{$spacing-xs});
					}
				}
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
			transition: background-color $transition-normal;

			&:hover:not(:disabled) {
				background: $primary-dark;
			}

			&:disabled {
				background: lighten($text-secondary, 30%);
				cursor: not-allowed;
			}
		}
	}

	@media (max-width: $breakpoint-md) {
		.contact-form {
			.menu-selection {
				.menu-items-grid {
					grid-template-columns: 1fr;
				}
			}
		}
	}
</style>
