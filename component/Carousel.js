import React, { useState, useRef, useEffect } from 'react'
import { View, Image, FlatList, TouchableOpacity, Dimensions, Modal, Text } from 'react-native'
import tw from "twrnc";

const Carousel = ({ data, CurrentImagePressed, FirstImage, width, height }) => {
  const isFlatList = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState(data);

  useEffect(() => {
    setImages(data);

    if (FirstImage) {
      setCurrentIndex(FirstImage);
    }
  }, [data, FirstImage]);

  const scrollToIndex = (index) => {
    isFlatList.current?.scrollToIndex({ animated: true, index: index });
    setCurrentIndex(index);
  }

  const onViewRef = useRef((view) => {
    if (view.changed[0].isViewable) {
      setCurrentIndex(view.changed[0].index);
    }
  });

  const viewConfigRef = useRef({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  })

  const getItemLayout = (data, index) => (
    { length: width, offset: width * index, index }
  );

  const renderlItem = ({ item, index }) => {
    return (
      <View style={tw`relative justify-center`}>
        <TouchableOpacity
          key={index}
          onPress={() => CurrentImagePressed(index)}
        >
          <Image
            style={{
              width: width,
              height: height,
              alignSelf: 'center',
            }}
            source={{ uri: item }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
    )
  }
  
  return (
    <View >
        <FlatList
          data={images}
          ref={isFlatList}
          keyExtractor={({ }, index) => index}
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderlItem}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          initialScrollIndex={FirstImage ? FirstImage : 0}
          getItemLayout={getItemLayout}
        />

      <View style={tw`flex-row justify-center my-8`}>
        {images.map(({ }, index) => (
          <TouchableOpacity
            key={index}
            style={[
              tw`w-2.5 h-2.5 bg-gray-300 rounded-full mx-1`,
              { backgroundColor: index == currentIndex ? "black" : "grey" }
            ]}
          />

        ))}
      </View>
    </View >
  )
}



export default Carousel
