
const getTrimesterName = (stage: number | null) => {
    switch (stage) {
        case 1: return '1st Trimester';
        case 2: return '2nd Trimester';
        case 3: return '3rd Trimester';
        default: return 'Not specified';
    }
};

  const getMealPlanText = (mealPlan: string | null) => {
        switch (mealPlan) {
            case 'all': return 'All Foods';
            case 'pescatarian': return 'Pescatarian';
            case 'vegetarian': return 'Vegetarian';
            default: return 'Not specified';
        }
    };

export { getTrimesterName, getMealPlanText };
