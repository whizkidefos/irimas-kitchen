<script lang="ts">
    export let title = "Irima's Kitchen - Authentic Nigerian Cuisine";
    export let description = "Experience authentic Nigerian cuisine with a modern twist at Irima's Kitchen. Order traditional dishes made with fresh, locally-sourced ingredients.";
    export let keywords = "Nigerian food, African cuisine, traditional Nigerian dishes, modern African food, Nigerian restaurant";
    export let ogImage = "/og-image.jpg";
    export let canonicalUrl = "";
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonicalUrl} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={ogImage} />

    <!-- Canonical URL -->
    {#if canonicalUrl}
        <link rel="canonical" href={canonicalUrl} />
    {/if}
</svelte:head>
