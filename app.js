    const finalSummary = document.querySelector('.summary-container');
    const expenseContainer = document.querySelector('.expense-container');

    const data = [
        {
            name: "Rohit",
            expense: 0,
        },
        {
            name: "Akshay",
            expense: 0,
        },
        {
            name: "Sundarm",
            expense: 0,
        }
    ];

    const showInputFields = () => {
        const memberInputs = data.map((val) => {
            return `
            <label class="expense-label">${val.name}</label>
            <input type="number" placeholder="Enter the expense" class="expense-input" data-name=${val.name}/>
            `;
        });


        memberInputs.forEach(member => {
            const divElement = document.createElement('div')
            divElement.innerHTML = member;
            divElement.classList.add('expense');
            expenseContainer.append(divElement);
        });
    }

    const distributeExpense = (enteredAmounts) => {
        const noOfPeople = data.length;
        let maxAmount = Number.MIN_VALUE;
        let finalDistribution = 0;

        enteredAmounts.forEach((amount) => {
            maxAmount = Math.max(maxAmount, amount.expense);
        });

        
        enteredAmounts.forEach((amount) => {
            if(amount.expense < maxAmount) {
                finalDistribution -= amount.expense;
            }
        });
        expenseToBeDistributed = finalDistribution / noOfPeople;

        const finalSummary = data.map((people) => {
            return {
                ...people,
                expense: expenseToBeDistributed
            }       
        });
        return finalSummary;
    }

    const showSummary = (members) => {
        let fragment = document.createDocumentFragment();
        let ul = document.createElement('ul');
        ul.classList.add('summary');
        members.forEach((member) => {
            const li = document.createElement('li');
            const memberName = document.createElement('span');
            const expenseForEach = document.createElement('span');
            memberName.innerText = member.name;
            expenseForEach.innerHTML = member.expense;
            li.appendChild(memberName);
            li.appendChild(expenseForEach);
            fragment.appendChild(li);
        });
        ul.append(fragment);
        finalSummary.appendChild(ul);
    }


    window.addEventListener('DOMContentLoaded', () => {
        showInputFields();

        
        const expenseBtn = document.querySelector('.expense-btn');
        const expenseInput = document.querySelectorAll('.expense-input');

        expenseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const enteredValues = Array.from(expenseInput).map((input, index) => {
                    return {
                        name: input.dataset.name,
                        expense: input.value
                    }
            })
            console.log(enteredValues)
            showSummary(distributeExpense(enteredValues));
        });
    });
