<template>
    <div>
        <div class="summary-wrapper">
            <div class="summary-container">
                <div class="summary-container-txt">
                    <span class="summary-container-title">
                        Average Margin
                        <UTooltip text="Average margin of your entries.">
                            <UIcon name="i-ph-info-duotone"/>
                        </UTooltip>
                    </span>
                    <span class="summary-container-value">€ 107.29</span>
                </div>
                <UButton
                    icon="i-ph-bank-duotone"
                    size="xl"
                    variant="soft"
                    color="primary"
                />
            </div>
            <div class="summary-container">
                <div class="summary-container-txt">
                    <span class="summary-container-title">
                        Trade Expectancy
                        <UTooltip text="Average result value.">
                            <UIcon name="i-ph-info-duotone"/>
                        </UTooltip>
                    </span>
                    <span class="summary-container-value">€ +17.84</span>
                </div>
                <UButton
                    icon="i-ph-chart-line-duotone"
                    size="xl"
                    variant="soft"
                    color="primary"
                />
            </div>
            <div class="summary-container">
                <div class="summary-container-txt">
                    <span class="summary-container-title">
                        Win Rate
                        <UTooltip text="Average chance for a win trade.">
                            <UIcon name="i-ph-info-duotone"/>
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
            <div class="summary-container">
                <div class="summary-container-txt">
                    <span class="summary-container-title">
                        Profit Factor
                        <UTooltip text="Average risk/reward ratio of a trade.">
                            <UIcon name="i-ph-info-duotone"/>
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
        </div>
        <div class="trades-wrapper">
            <div class="calendar-container">
                <div class="calendar-header">
                    <UButton 
                        @click="previousMonth()" 
                        variant="ghost"
                        color="gray"
                        icon="i-ph-caret-left-duotone"
                        square
                    />
                    <UButton 
                        @click="nextMonth()" 
                        variant="ghost"
                        color="gray"
                        icon="i-ph-caret-right-duotone"
                        square
                    />
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
            <div class="trades-container">
                <div class="trades-header">
                    <span>{{ selectedDate.toDateString() }}</span>
                </div>
                <hr class="trades-divider">
                <UTable
                    class="trades-table"
                    :rows="trades"
                    :columns="columns"
                    :empty-state="{ icon: 'i-ph-folder-notch-open-duotone', label: 'No trades.' }"
                >
                    <template #isBuy-data="{ row }">
                        <span :class="['trades-table-trend', row.isBuy ? 'buy' : 'sell']">{{ row.isBuy ? "BUY" : "SELL" }}</span>
                    </template>
                    <template #margin-data="{ row }">
                        <span>{{ `€ ${row.margin}` }}</span>
                    </template>
                    <template #result-data="{ row }">
                        <span :class="['trades-table-result', row.result < 0 ? 'lose' : 'win']">{{ `€ ${row.result < 0 ? '' : '+'}${row.result.toFixed(2)}` }}</span>
                    </template>
                    <template #actions-data="{ row }">
                        <UDropdown
                            :items="[
                                [{
                                    label: 'View',
                                    icon: 'i-ph-eye-duotone',
                                    click: () => console.log(`Edti ${row}`),
                                }],
                                [{
                                    label: 'Delete',
                                    icon: 'i-ph-trash-duotone',
                                    click: () => console.log(`Delete ${row}`),
                                }],
                            ]"
                        >
                            <UButton color="gray" variant="ghost" icon="i-ph-dots-three-duotone"/>
                        </UDropdown>
                    </template>
                </UTable>
                <UButton @click="openModal" class="new-trade-btn" size="md">
                    <UIcon name="i-ph-plus-duotone"/>New Trade
                </UButton>
            </div>
        </div>
        <UModal v-model="modal" prevent-close>
            <UCard>
                <template #header>
                    <div class="modal-header">
                        <h1 class="modal-header-title">New Trade</h1>
                        <UButton
                            icon="i-ph-x-duotone"
                            variant="ghost"
                            color="gray"
                            square
                            @click="closeModal()"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
    const columns = [
        {
            key: "instrument",
            label: "Instrument",
        },
        {
            key: "isBuy",
            label: "Trend",
        },
        {
            key: "margin",
            label: "Margin",
        },
        {
            key: "risk",
            label: "Risk",
        },
        {
            key: "result",
            label: "Result",
        },
        {
            key: "actions",
        },
    ];

    const trades = [
        {
            id: 0,
            instrument: "EURUSD",
            isBuy: true,
            margin: 100.26,
            risk: 1.86,
            result: 2.78,
        },
        {
            id: 1,
            instrument: "AUDUSD",
            isBuy: true,
            margin: 99.12,
            risk: 0.97,
            result: -1.56,
        },
        {
            id: 2,
            instrument: "GBPUSD",
            isBuy: false,
            margin: 115.33,
            risk: 2.15,
            result: 3.12,
        },
        {
            id: 3,
            instrument: "GOLD",
            isBuy: true,
            margin: 107.54,
            risk: 1.45,
            result: 2.8,
        },
    ];

    const selectedDate = ref<Date>(new Date());
    const modal = ref<boolean>(false);

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

    function openModal() {
        modal.value = true;
    }

    function closeModal() {
        modal.value = false;
    }
</script>

<style scoped>
    .summary-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
    }

    .summary-container, .calendar-container, .trades-container {
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

    .trades-wrapper {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        padding-top: 2rem;
    }

    .calendar-container, .trades-container {
        position: relative;
        padding: 1rem 2rem 2rem 2rem;
    }

    .calendar-header, .trades-header {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
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

    .trades-table {
        padding-bottom: 4rem;
    }

    .trades-table-trend {
        padding: .25rem .5rem;
        font-size: .75rem;
        font-weight: bold;
        border-radius: .25rem;
    }

    .trades-table-trend.buy {
        color: var(--color-primary);
        background-color: var(--color-primary-alt);
    }

    .trades-table-trend.sell {
        color: var(--color-red);
        background-color: var(--color-red-alt);
    }

    .trades-table-result {
        font-weight: bold;
    }

    .trades-table-result.win {
        color: var(--color-primary);
    }

    .trades-table-result.lose {
        color: var(--color-red);
    }

    .new-trade-btn {
        position: absolute;
        right: 2rem;
        bottom: 2rem;
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .modal-header-title {
        color: var(--color-text);
    }

    @media only screen and (max-width: 1488px) {
        .summary-wrapper {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .trades-wrapper {
            grid-template-columns: 1fr;
        }
    }

    @media only screen and (max-width: 1024px) {
        .calendar-day-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
        }

        .calendar-day.irrelevant, .calendar-weekday {
            display: none;
        }
    }

    @media only screen and (max-width: 768px) {
        .summary-wrapper {
            grid-template-columns: 1fr;
        }
    }
</style>