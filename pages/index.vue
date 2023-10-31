<template>
    <div>
        <div class="summary">
            <div class="container summary-card">
                <div class="summary-card-txt">
                    <span class="summary-card-title">
                        Profile Value
                        <UTooltip text="The current total value of your portfolio.">
                            <Icon name="ph:info-duotone"/>
                        </UTooltip>
                    </span>
                    <span class="summary-card-value">€ 1458.16</span>
                </div>
                <button class="summary-card-btn">
                    <Icon name="ph:bank-duotone"/>
                </button>
            </div>
            <div class="container summary-card">
                <div class="summary-card-txt">
                    <span class="summary-card-title">
                        Trade Expectancy
                        <UTooltip text="Average result value.">
                            <Icon name="ph:info-duotone"/>
                        </UTooltip>
                    </span>
                    <span class="summary-card-value">€ +17.84</span>
                </div>
                <button class="summary-card-btn">
                    <Icon name="ph:chart-line-duotone"/>
                </button>
            </div>
            <div class="container summary-card">
                <div class="summary-card-txt">
                    <span class="summary-card-title">
                        Win Rate
                        <UTooltip text="Average chance of a winning trade.">
                            <Icon name="ph:info-duotone"/>
                        </UTooltip>
                    </span>
                    <span class="summary-card-value">% 25.00</span>
                </div>
            </div>
            <div class="container summary-card">
                <div class="summary-card-txt">
                    <span class="summary-card-title">
                        Profit Factor
                        <UTooltip text="Average risk/reward ratio of a trade.">
                            <Icon name="ph:info-duotone"/>
                        </UTooltip>
                    </span>
                    <span class="summary-card-value">0.43</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .summary {
        display: flex;
        gap: 2rem;
    }

    .summary-card {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem;
    }

    .summary-card-txt {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .summary-card-title {
        display: flex;
        align-items: center;
        gap: .5rem;
        color: var(--color-text-alt);
    }

    .summary-card-value {
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    .summary-card-btn {
        width: 3rem;
        height: 3rem;
        display: grid;
        place-items: center;
        background-color: var(--color-bg-tertiary);
        color: var(--color-primary);
        font-size: 1.5rem;
        border-radius: .5rem;
    }
</style>