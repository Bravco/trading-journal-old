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
                    <button @click="previousMonth" class="calendar-header-btn">
                        <Icon name="ph:caret-left-duotone"/>
                    </button>
                    <button @click="nextMonth" class="calendar-header-btn">
                        <Icon name="ph:caret-right-duotone"/>
                    </button>
                    <span class="calendar-header-title">
                        {{ selectedDate.toLocaleString('en-us',{month:'short', year:'numeric'}) }}
                    </span>
                </div>
                <hr class="calendar-divider">
                <div class="calendar-day-grid">
                    <span v-for="weekday in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="weekday" class="calendar-weekday">
                        {{ weekday }}
                    </span>
                    <button 
                        v-for="date in viewedDates" 
                        :key="date.getTime()"
                        @click="selectedDate = date"
                        :disabled="date.getMonth() !== selectedDate.getMonth()"
                        :class="[
                            'calendar-day',
                            Math.round(Math.random()) ? (Math.round(Math.random()) ? 'win' : 'lose') : '',
                            {'selected': date.toDateString() === selectedDate.toDateString()},
                            {'irrelevant': date.getMonth() !== selectedDate.getMonth()}
                        ]"
                    >
                        <span class="calendar-day-index">{{ date.getDate() }}</span>
                        <span class="calendar-day-result">€ +16.77</span>
                        <span class="calendar-day-tradecount">2 trades</span>
                    </button>
                </div>
            </div>
            <div class="container trades-container">
                <div class="trades-header">
                    <span>{{ selectedDate.toDateString() }}</span>
                </div>
                <hr class="trades-divider">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const selectedDate = useState<Date>("selectedDate", () => new Date());

    const viewedDates = computed(() => {
        return getMonthDates(selectedDate.value.getFullYear(), selectedDate.value.getMonth()+1);
    });

    function getMonthDates(year : number, month : number) : Date[] {
        const currentDate = new Date(year, month-1, 1);
        const dates : Date[] = [];

        while (currentDate.getDay() !== 1) {
            currentDate.setDate(currentDate.getDate()-1);
        }

        for (let i = 0; i < 7*6; i++) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate()+1);
        }

        return dates;
    }

    function previousMonth() {
        let currentMonth : number = selectedDate.value.getMonth();
        if (currentMonth === 0) {
            selectedDate.value = new Date(
                selectedDate.value.getFullYear()-1,
                11,
                selectedDate.value.getDate()
            );
        } else {
            selectedDate.value = new Date(
                selectedDate.value.getFullYear(),
                currentMonth-1,
                selectedDate.value.getDate()
            );
        }
    }

    function nextMonth() {
        let currentMonth : number = selectedDate.value.getMonth();
        if (currentMonth === 11) {
            selectedDate.value = new Date(
                selectedDate.value.getFullYear()+1,
                0,
                selectedDate.value.getDate()
            );
        } else {
            selectedDate.value = new Date(
                selectedDate.value.getFullYear(),
                currentMonth+1,
                selectedDate.value.getDate()
            );
        }
    }
</script>

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

    .calendar-day-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1rem;
        padding-top: 2rem;
    }

    .calendar-weekday, .calendar-day {
        border: 1px solid var(--color-bg-tertiary);
        border-radius: .5rem;
    }

    .calendar-weekday {
        padding: .25rem 0;
        text-align: center;
        font-weight: bold;
        color: var(--color-text-alt);
    }

    .calendar-day {
        min-height: 6rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        padding: 0 1rem;
    }

    .calendar-day.irrelevant > * {
        display: none;
    }

    .calendar-day:not(.irrelevant) {
        border-color: var(--color-text-alt);
    }

    .calendar-day:not(.irrelevant).win {
        background-color: var(--color-primary-alt);
        border-color: transparent;
    }

    .calendar-day:not(.irrelevant).lose {
        background-color: var(--color-red-alt);
        border-color: transparent;
    }

    .calendar-day.selected {
        border-color: var(--color-text);
    }

    .calendar-day.selected.win {
        border-color: var(--color-primary);
    }

    .calendar-day.selected.lose {
        border-color: var(--color-red);
    }

    .calendar-day-index, .calendar-day-tradecount {
        font-size: 12px;
    }

    .calendar-day-index {
        padding-bottom: 1rem;
    }

    .calendar-day-result {
        font-weight: bold;
    }

    .calendar-day.win .calendar-day-result {
        color: var(--color-primary);
    }

    .calendar-day.lose .calendar-day-result {
        color: var(--color-red);
    }
</style>