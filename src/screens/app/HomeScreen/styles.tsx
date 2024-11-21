import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#2d3b37',
    height: 140,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderEndEndRadius: 20,
    borderBottomStartRadius: 20,
    padding: 5,
  },
  textContainer: {
    marginHorizontal: 15,
  },
  text: {
    color: 'wheat',
    fontSize: 28,
    fontWeight: '700',
  },
  input: {
    height: 50,
    width: '85%',
    borderRadius: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,

    backgroundColor: '#c7d6cd',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingVertical: 5,
  },
  recommendedContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  recommendedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3b37',
  },
  recommendedLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#694241',
  },
  products: {
    paddingHorizontal: 12,
    gap: 5,
    justifyContent: 'space-around',
  },
  historySection: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  historySectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  historyItemContainer: {
    marginRight: 15,
    width: 150,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // display: 'flex',
    // justifyContent: 'space-evenly',
  },
  historyItemImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  historyItemTextContainer: {
    padding: 10,
  },
  historyItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  historyItemCategory: {
    fontSize: 12,
    color: 'gray',
  },
  appDescriptionContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 3, // Optional, for shadow effect
  },
  appDescriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  appDescriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  closeModalButton: {
    backgroundColor: '#2d3b37',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
