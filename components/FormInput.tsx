import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';

interface FormInputProps extends TextInputProps {
  icon: keyof typeof Ionicons.glyphMap;
  error?: string | null;
  mask?: (string | RegExp)[];
}

export default function FormInput({ 
  icon, 
  error, 
  mask,
  style,
  ...props 
}: FormInputProps) {
  const InputComponent = mask ? MaskInput : TextInput;

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputWrapper,
        error && styles.inputWrapperError
      ]}>
        <Ionicons name={icon} size={20} color={error ? '#FF3B30' : '#666'} style={styles.inputIcon} />
        <InputComponent
          style={[styles.input, style]}
          placeholderTextColor="#999"
          {...props}
          mask={mask}
        />
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputWrapperError: {
    borderColor: '#FF3B30',
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 15,
  },
});
