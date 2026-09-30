import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { useRequests } from '../hooks/RequestContext';
import { COLORS } from '../constants/Colors';

const categories = [
  { id: 'Medical', icon: 'medical-bag', color: '#DC2626' },
  { id: 'Flood', icon: 'waves', color: '#2563EB' },
  { id: 'Fire', icon: 'fire', color: '#EA580C' },
  { id: 'Rescue', icon: 'lifebuoy', color: '#7C3AED' },
  { id: 'Food & Water', icon: 'food-apple', color: '#059669' },
  { id: 'Other', icon: 'dots-horizontal-circle', color: '#9CA3AF' },
];

export default function SOSSheet({ visible, onDismiss }) {
  const [step, setStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState(null);
  const [details, setDetails] = useState('');
  const [peopleAffected, setPeopleAffected] = useState('');
  const [contact, setContact] = useState('');
  const [hasImage, setHasImage] = useState(false);
  const { addRequest } = useRequests();

  const handleCategorySelect = (cat) => {
    setSelectedCat(cat);
    setStep(2);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Camera permission is required to capture photos.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setHasImage(result.assets[0].uri);
    }
  };

  const handleSend = () => {
    if (selectedCat) {
      addRequest(selectedCat.id, details, { peopleAffected, contact, hasImage });
      Alert.alert(
        "Request Sent Successfully",
        "Your emergency request has been received by the Response Team. Help is on the way."
      );
    }
    setStep(1);
    setSelectedCat(null);
    setDetails('');
    setPeopleAffected('');
    setContact('');
    setHasImage(false);
    onDismiss();
  };

  const handleClose = () => {
    setStep(1);
    setSelectedCat(null);
    setDetails('');
    setPeopleAffected('');
    setContact('');
    setHasImage(false);
    onDismiss();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.sheetContainer}>
          <View style={styles.sheet}>
            {step === 1 ? (
              <View>
                <Text style={styles.title}>Emergency Type</Text>
                <View style={styles.grid}>
                  {categories.map(cat => (
                    <TouchableOpacity key={cat.id} style={styles.catCard} onPress={() => handleCategorySelect(cat)}>
                      <MaterialCommunityIcons name={cat.icon} size={32} color={cat.color} />
                      <Text style={styles.catText}>{cat.id}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.headerRow}>
                  <TouchableOpacity onPress={() => setStep(1)} style={styles.backBtn}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text || '#1F2937'} />
                  </TouchableOpacity>
                  <Text style={styles.title}>{selectedCat ? selectedCat.id : ''} Emergency</Text>
                </View>
                <View style={styles.locRow}>
                  <MaterialCommunityIcons name="map-marker" size={16} color={COLORS.success || '#10B981'} />
                  <Text style={styles.locText}>Using current location</Text>
                </View>
                
                <TextInput
                  style={styles.inputSmall}
                  placeholder="Number of People Affected (e.g. 3)"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={peopleAffected}
                  onChangeText={setPeopleAffected}
                />
                <TextInput
                  style={styles.inputSmall}
                  placeholder="Contact Phone Number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={contact}
                  onChangeText={setContact}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Additional details (optional)..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  value={details}
                  onChangeText={setDetails}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                
                <TouchableOpacity 
                  style={[styles.attachBtn, hasImage && styles.attachBtnActive]} 
                  onPress={pickImage}
                >
                  <MaterialCommunityIcons name={hasImage ? "image-check" : "camera-plus"} size={20} color={hasImage ? COLORS.primary : '#6B7280'} />
                  <Text style={[styles.attachText, hasImage && styles.attachTextActive]}>
                    {hasImage ? 'Image Attached' : 'Attach Image (Optional)'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                  <Text style={styles.sendBtnText}>SEND REQUEST</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.35)' },
  backdrop: { ...StyleSheet.absoluteFillObject },
  sheetContainer: { width: '100%' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 24, paddingBottom: 40 },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.text || '#1F2937', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  catCard: { width: '31%', aspectRatio: 1, backgroundColor: '#F3F4F6', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  catText: { fontSize: 12, fontWeight: '600', color: COLORS.text || '#1F2937', marginTop: 8, textAlign: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { marginRight: 16, marginTop: -20 },
  locRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  locText: { color: COLORS.success || '#10B981', fontSize: 14, marginLeft: 8 },
  input: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: COLORS.border || '#E5E7EB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16, height: 100, marginBottom: 16, color: '#1F2937' },
  inputSmall: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: COLORS.border || '#E5E7EB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16, minHeight: 48, marginBottom: 12, color: '#1F2937' },
  attachBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', height: 48, borderRadius: 8, marginBottom: 24, borderWidth: 1, borderColor: '#E5E7EB', borderStyle: 'dashed' },
  attachBtnActive: { backgroundColor: '#EFF6FF', borderColor: COLORS.primary || '#2563EB', borderStyle: 'solid' },
  attachText: { color: '#6B7280', fontSize: 14, fontWeight: '500', marginLeft: 8 },
  attachTextActive: { color: COLORS.primary || '#2563EB', fontWeight: 'bold' },
  sendBtn: { backgroundColor: COLORS.critical || '#DC2626', height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  sendBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
