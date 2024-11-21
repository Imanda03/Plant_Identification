import React from 'react';
import {View, StyleSheet} from 'react-native';

const Skeleton = ({width, height, borderRadius = 10, style}: any) => {
  return (
    <View style={[styles.skeleton, {width, height, borderRadius}, style]} />
  );
};

const CameraScreenSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <View style={styles.buttonContainer}>
          <Skeleton width="100%" height={50} style={styles.buttonSkeleton} />
          <Skeleton width="100%" height={50} style={styles.buttonSkeleton} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e8e8',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  border: {
    height: '50%',
    width: '80%',
    borderWidth: 5,
    borderRadius: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
  },
  skeleton: {
    backgroundColor: '#e0e0e0', // Light grey background
    marginVertical: 10,
    // animationDuration: '1.5s',
  },
  buttonSkeleton: {
    backgroundColor: '#d0d0d0', // Slightly darker grey for buttons
  },
});

export default CameraScreenSkeleton;
