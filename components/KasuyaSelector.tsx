import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const KasuyaSelector = ({selectorType, currentSelector, setSelector, selectorOptions}) => {

    const renderOption = (options, selected, onSelect) => (
        options.map((option) => (
            <TouchableOpacity
                key={option}
                style={selected === option && styles.selectedOption}
                className="w-fit border border-1 border-slate-100"
                onPress={() => onSelect(option)}
            >
                <Text className="text-slate-100 text-center text-base font-share my-1 mx-1">{option}</Text>
            </TouchableOpacity>
        )
    ));

  return (
    <View className="">
        <Text className="text-white text-center font-share text-lg tracking-tighter">{selectorType}</Text>
      <View style={styles.selector}>
        {renderOption(selectorOptions, currentSelector, setSelector)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
  },
  option: {
    flex: 1,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#667', // Highlight selected option
  },
  optionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default KasuyaSelector;
