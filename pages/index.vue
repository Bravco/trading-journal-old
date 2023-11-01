<template>
    <div>
        <div class="main">
            <div class="container summary-container">
                <div class="summary-container-txt">
                    <span class="summary-container-title">
                        Profile Value
                        <UTooltip text="The current total value of your portfolio.">
                            <Icon name="ph:info-duotone"/>
                        </UTooltip>
                    </span>
                    <span class="summary-container-value">€ 1458.16</span>
                </div>
                <button class="summary-container-btn">
                    <Icon name="ph:bank-duotone"/>
                </button>
            </div>
            <div class="container summary-container">
                <div class="summary-container-txt">
                    <span class="summary-container-title">
                        Trade Expectancy
                        <UTooltip text="Average result value.">
                            <Icon name="ph:info-duotone"/>
                        </UTooltip>
                    </span>
                    <span class="summary-container-value">€ +17.84</span>
                </div>
                <button class="summary-container-btn">
                    <Icon name="ph:chart-line-duotone"/>
                </button>
            </div>
            <div class="container summary-container">
                <div class="summary-container-txt">
                    <span class="summary-container-title">
                        Win Rate
                        <UTooltip text="Average chance for a win trade.">
                            <Icon name="ph:info-duotone"/>
                        </UTooltip>
                    </span>
                    <span class="summary-container-value">% 25.00</span>
                </div>
                <v-progress-circular
                    :model-value="25"
                    color="var(--color-primary)"
                    bg-color="var(--color-red)"
                    :size="96"
                    :width="8"
                    style="stroke-linecap: round;"
                />
            </div>
            <div class="container summary-container">
                <div class="summary-container-txt">
                    <span class="summary-container-title">
                        Profit Factor
                        <UTooltip text="Average risk/reward ratio of a trade.">
                            <Icon name="ph:info-duotone"/>
                        </UTooltip>
                    </span>
                    <span class="summary-container-value">0.43</span>
                </div>
                <v-progress-linear
                    :model-value="43"
                    color="var(--color-primary)"
                    bg-color="var(--color-red)"
                    :height="8"
                    :bg-opacity="1"
                    :rounded="true"
                    :rounded-bar="true"
                    style="left: 0; transform: translateX(0);"
                />
            </div>
            <div class="container calendar-container">
                <div class="calendar-header">
                    <button class="calendar-header-btn">
                        <Icon name="ph:caret-left-duotone"/>
                    </button>
                    <button class="calendar-header-btn">
                        <Icon name="ph:caret-right-duotone"/>
                    </button>
                    <span class="calendar-header-title">November 2023</span>
                </div>
                <hr class="calendar-divider">
            </div>
            <div class="container trades-container">
                <div class="trades-header">
                    <span class="trades-header-title">01.11.2023</span>
                </div>
                <hr class="trades-divider">
            </div>
        </div>
    </div>
</template>

<style scoped>
    .main {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        gap: 2rem;
    }

    .container {
        width: 100%;
        background-color: var(--color-bg-secondary);
        border: 1px solid var(--color-bg-tertiary);
        border-radius: .5rem;
    }

    .summary-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
    }

    .summary-container-txt {
        min-width: max-content;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .summary-container-title {
        display: flex;
        align-items: center;
        gap: .5rem;
        color: var(--color-text-alt);
    }

    .summary-container-value {
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    .summary-container-btn {
        width: 3rem;
        height: 3rem;
        display: grid;
        place-items: center;
        background-color: var(--color-bg-tertiary);
        color: var(--color-primary);
        font-size: 1.5rem;
        border-radius: .5rem;
    }

    .calendar-container, .trades-container {
        position: relative;
        padding: 1rem 2rem 2rem 2rem;
    }

    .calendar-container {
        grid-column: span 3;
    }

    .calendar-header, .trades-header {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }

    .calendar-header-btn {
        width: 1rem;
        height: 1rem;
        display: grid;
        place-items: center;
    }

    .calendar-header-title {
        margin-left: 1rem;
    }

    .calendar-divider, .trades-divider {
        width: 100%;
        position: absolute;
        left: 0;
        border-color: var(--color-bg-tertiary);
    }
</style>