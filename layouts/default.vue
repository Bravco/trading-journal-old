<template>
    <div>
        <header>
            <nav>
                <h1 class="logo">
                    <NuxtLink to="/"><span>Trading</span> Journal</NuxtLink>
                </h1>
            </nav>
        </header>
        <main>
            <slot/>
        </main>
    </div>
</template>

<style scoped>
    nav {
        padding: 1rem 5%;
    }

    .logo {
        font-size: 1.25rem;
        font-weight: bold;
    }

    .logo span {
        color: var(--color-primary);
    }
</style>