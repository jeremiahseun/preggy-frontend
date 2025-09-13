import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ThemedText } from './ThemedText';
import { GapColumn } from './Gap';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectFilter: (filter: string) => void;
  filters: string[];
};

export default function FilterModal({ visible, onClose, onSelectFilter, filters }: FilterModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={onClose}>
        <View style={styles.modalContent}>
          <ThemedText type="subtitle">Filter by Category</ThemedText>
          <GapColumn space={20} />
          <FlatList
            data={filters}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelectFilter(item)} style={styles.filterItem}>
                <ThemedText>{item}</ThemedText>
              </TouchableOpacity>
            )}
          />
          <GapColumn space={20} />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <ThemedText style={{ color: 'red' }}>Close</ThemedText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    maxHeight: '60%',
    paddingBottom: 40,
  },
  filterItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
      marginTop: 10,
      alignItems: 'center',
  }
});
