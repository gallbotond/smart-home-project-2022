import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

export default function DatingHomeScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>DatingHomeScreen</Text>
      <Button title="Go to chat screen" onPress={() => navigation.navigate("Chat")} />
    </View>
  )
}