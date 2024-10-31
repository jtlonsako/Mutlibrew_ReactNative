import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSelectionOptionDescription } from '@/lib/database';
import CustomSelectionModal from './CustomSelectionModal';

const SelectionCard = ({ selectionType, selectionOptionDetails, setSelectionValue, selectedOption, setCustomButton, setSelectedOption, valuePrefix="", valuePostfix="" }) => {
  const [selectionDescriptor, setSelectionDescriptor] = useState('');
  const [customButtonModalVisible, setCustomButtonModalVisible] = useState(false);
  const [customValue, setCustomValue] = useState(selectionOptionDetails.value);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getSelectionOptionDescription(selectionOptionDetails.BrewCalculationDescriptorId);
        setSelectionDescriptor(result.description);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    setCustomValue(selectionOptionDetails.value);
  }, [selectedOption])

  useEffect(() => {
  }, [selectedOption])

  function buttonPressed() {
    if(selectionDescriptor !== 'Custom'){
      setSelectionValue(selectionOptionDetails.value)
      setSelectedOption(selectionOptionDetails.BrewCalculationDescriptorId)
    } else {
        selectedOption === selectionOptionDetails.BrewCalculationDescriptorId ?
          setCustomButtonModalVisible(true) :
          setSelectionValue(selectionOptionDetails.value)
          setSelectedOption(selectionOptionDetails.BrewCalculationDescriptorId)
    }
  }

  function customValueChange(newValue) {
    if(!isNaN(newValue)) setCustomValue(newValue);
  }

  function closeCustomModal() {
    let newCustomValue = customValue;
    if(valuePostfix === "ml") newCustomValue = Math.round(customValue) //Water amounts CANNOT be floating point (it breaks the "pourAmounts" calculation by creating an infinite loop)
    else if (newCustomValue % 1 !== 0) newCustomValue = parseFloat(customValue).toFixed(1);
    setCustomButton({
      value: newCustomValue,
      descriptionValue: `${valuePrefix}${newCustomValue}${valuePostfix}`,
      BrewCalculationDescriptorId: 7
    });
    setSelectionValue(newCustomValue)
    setCustomValue(newCustomValue);
    setCustomButtonModalVisible(false);
  }

  function customValueAdd() {
    setCustomValue(parseInt(customValue) + 1);
  }
  function customValueSubtract() {
    setCustomValue(parseInt(customValue) - 1);
  }

  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={customButtonModalVisible}
      >
        <CustomSelectionModal
          closeModalFunction={closeCustomModal} selectionType={selectionType} 
          customValueSubtract={customValueSubtract} customValueAdd={customValueAdd} 
          customValueChange={customValueChange} customValue={customValue} 
          valuePrefix={valuePrefix} valuePostfix={valuePostfix}
        />
      </Modal>
      
      <View className="flex w-32">
        <TouchableOpacity onPress={buttonPressed}>
          {selectedOption == selectionOptionDetails.BrewCalculationDescriptorId ? (
            <View>
              <Text className="text-2xl w-full text-slate-100 pt-2 text-center font-playfairMedium">{selectionDescriptor}</Text>
              <Text className="text-base text-slate-100 font-light text-center italic">{selectionOptionDetails.descriptionValue}</Text>
            </View>
          ) : (
            <View className="opacity-50">
              <Text className="text-base w-full text-slate-100 pt-5 text-center font-playfair">{selectionDescriptor}</Text>
              <Text className="text-xs text-slate-100 font-light text-center italic">{selectionOptionDetails.descriptionValue}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SelectionCard