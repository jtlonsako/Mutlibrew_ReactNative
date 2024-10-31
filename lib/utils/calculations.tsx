export function calculateCoffeeAmount(sizeOptionType: number, sizeValue: number, strengthValue: string, setCalculatedGrounds) {
  try {
    if(sizeOptionType === 1) {
      setCalculatedGrounds(Math.round((sizeValue * 1.0 / strengthValue) * 10) / 10);
    } else {
      setCalculatedGrounds(sizeValue);
    }
  } catch(error) {
    console.log(`Error in calculateCoffeeAmount: ${error}`)
  }
}

export function calculateWaterAmount(sizeOptionType: number, sizeValue: number, strengthValue: string, setCalculatedWater) {
  try {
    if (sizeOptionType === 1) {
      setCalculatedWater(sizeValue)        
    } else {
      setCalculatedWater(Math.round((sizeValue * 1.0 * strengthValue * 10 / 10)))
    }
  } catch(error) {
    console.log(`Error in calculateWaterAmount: ${error}`)
  }
}

export function calculatePourAmounts(pourMethod: string, totalWater: number,  balance: string, strength: string) {
  let pourAmountArray: any[] = [];

  if(pourMethod === "hoffmann") { //James Hoffman, Simple
    let divisibleByFourOffset = 0;
    let firstPourAmount = Math.floor(totalWater / 5) - divisibleByFourOffset;
    let equalPourAmount = (totalWater - firstPourAmount) / 4;
    pourAmountArray = Array(5).fill(0);

    while ((totalWater - firstPourAmount) % 4 !== 0) {
      divisibleByFourOffset = divisibleByFourOffset + 1;
      firstPourAmount = Math.floor(totalWater / 5) - divisibleByFourOffset;
    }

    equalPourAmount = (totalWater - firstPourAmount) / 4;
    pourAmountArray = pourAmountArray.map((trash, i) => {
      return {
        data: firstPourAmount + (equalPourAmount * i),
        id: i
      }
    })

    return pourAmountArray

  } else if (pourMethod === "kasuya") { //Tetsu Kasuya, FourSix
    const firstPourGroupAmount = Math.floor(totalWater * 0.4)
    const firstPourGroupBalanceDiff = Math.round(firstPourGroupAmount * .33 / 2);
    const secondPourGroup = (totalWater * 0.4) > firstPourGroupAmount ? Math.floor(totalWater * 0.6) + 1 : Math.floor(totalWater * 0.6);

    const firstGroupNumberOfPours = 2;
    const secondGroupNumberOfPours = strength === "Mild" ? 1 : strength === "Medium" ? 2 : 3;

    if (balance === "Sweet") {
      for (let i = 0; i < firstGroupNumberOfPours; i++) {
        pourAmountArray.push({
          data: i === 0 ? Math.floor(firstPourGroupAmount / 2) - firstPourGroupBalanceDiff : Math.ceil(firstPourGroupAmount / 2) + firstPourGroupBalanceDiff + pourAmountArray[i - 1].data,
          id: i
        })
      }
    } else if (balance === "Even") {
      for (let i = 0; i < firstGroupNumberOfPours; i++) {
        pourAmountArray.push({
          data: i === 0 ? Math.floor(firstPourGroupAmount / 2) : Math.ceil(firstPourGroupAmount / 2) + pourAmountArray[i - 1].data,
          id: i
        })
      }
    } else {
      for (let i = 0; i < firstGroupNumberOfPours; i++) {
        pourAmountArray.push({
          data: i === 0 ? Math.floor(firstPourGroupAmount / 2) + firstPourGroupBalanceDiff : Math.ceil(firstPourGroupAmount / 2) - firstPourGroupBalanceDiff + pourAmountArray[i - 1].data,
          id: i
        })
      }
    }

    for (let i = 2; i < secondGroupNumberOfPours + 2; i++) {
      pourAmountArray.push({
        data: i === secondGroupNumberOfPours + 1 ? Math.ceil(secondPourGroup / secondGroupNumberOfPours) + pourAmountArray[i - 1].data + totalWater : 
            Math.floor(secondPourGroup / secondGroupNumberOfPours) + pourAmountArray[i - 1].data,
        id: i
      });
    }

    pourAmountArray[pourAmountArray.length - 1].data = pourAmountArray[pourAmountArray.length - 1].data + (totalWater - pourAmountArray[pourAmountArray.length - 1].data) //Ensure that the final value ALWAYS adds up to 'totalWater'

    return pourAmountArray
  }
  return [];
}