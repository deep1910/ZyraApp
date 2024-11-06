import React from 'react';
import { Appbar } from 'react-native-paper';

export default function Header({ title, back, navigation }) {
  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}