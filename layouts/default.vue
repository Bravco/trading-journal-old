<template>
    <div>
        <header>
            <nav>
                <h1>
                    <NuxtLink to="/">Trading Journal</NuxtLink>
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
</style>