import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useRequests } from '../../hooks/RequestContext';
import TrackingTimeline from '../../components/TrackingTimeline';
import { COLORS } from '../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IncidentDetails() {
  const { id } = useLocalSearchParams();
  const { requests, acceptRequest, deployResources, resolveRequest } = useRequests();

  const request = requests?.find((req) => req.id === id);

  if (!request) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={{ title: 'Incident Not Found', headerShown: true }} />
        <Text style={styles.errorText}>The requested incident could not be found.</Text>
      </View>
    );
  }

  const renderActionButtons = () => {
    switch (request.status) {
      case 'pending':
        return (
          <Button
            mode="contained"
            onPress={() => acceptRequest(id)}
            style={styles.actionButton}
          >
            Accept
          </Button>
        );
      case 'accepted':
        return (
          <Button
            mode="contained"
            onPress={() => deployResources(id, ['Rescue Boat'])}
            style={styles.actionButton}
          >
            Deploy Resources
          </Button>
        );
      case 'deployed':
      case 'en_route':
        return (
          <Button
            mode="contained"
            onPress={() => resolveRequest(id)}
            style={styles.actionButton}
          >
            Mark Resolved
          </Button>
        );
      case 'resolved':
        return (
          <View style={styles.resolvedContainer}>
            <MaterialCommunityIcons name="check-circle" size={24} color={COLORS?.success || '#22C55E'} />
            <Text style={styles.resolvedText}>Incident Resolved</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: `Incident #${id.substring(0, 6)}`, headerShown: true }} />
      
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerRow}>
            <Title style={styles.title}>{request.type}</Title>
            <View style={[styles.priorityBadge, { backgroundColor: request.priority === 'high' ? (COLORS?.error || '#EF4444') : (COLORS?.warning || '#F59E0B') }]}>
              <Text style={styles.priorityText}>{request.priority?.toUpperCase()}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#64748B" />
            <Text style={styles.infoText}>{new Date(request.timestamp || new Date()).toLocaleString()}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#64748B" />
            <Text style={styles.infoText}>{request.location?.address || request.location || 'Unknown Location'}</Text>
          </View>

          {request.contact ? (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="phone" size={20} color="#64748B" />
              <Text style={styles.infoText}>Contact: {request.contact}</Text>
            </View>
          ) : null}

          {request.peopleAffected ? (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="account-group" size={20} color="#64748B" />
              <Text style={styles.infoText}>{request.peopleAffected} People Affected</Text>
            </View>
          ) : null}

          <Paragraph style={styles.message}>{request.message}</Paragraph>

          {request.hasImage ? (
            typeof request.hasImage === 'string' ? (
              <Image source={{ uri: request.hasImage }} style={styles.attachedImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <MaterialCommunityIcons name="image" size={40} color="#9CA3AF" />
                <Text style={styles.imagePlaceholderText}>Image Attachment Provided</Text>
              </View>
            )
          ) : null}
        </Card.Content>
      </Card>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>AI Allocation Suggestion</Title>
        <Card style={[styles.card, styles.aiCard]}>
          <Card.Content>
            <View style={styles.aiHeader}>
              <MaterialCommunityIcons name="robot" size={24} color={COLORS?.primary || '#2563EB'} />
              <Text style={styles.aiTitle}>Recommended Resources</Text>
            </View>
            <Paragraph style={styles.aiText}>
              Based on {request.peopleAffected || 'multiple'} people affected by this {request.type?.toLowerCase()} emergency in {request.location?.address || 'this area'}, we suggest deploying:
            </Paragraph>
            <View style={styles.resourceChips}>
              {request.type === 'Medical' && (
                <>
                  <View style={styles.chip}><Text style={styles.chipText}>🚑 1x Ambulance</Text></View>
                  <View style={styles.chip}><Text style={styles.chipText}>⚕️ 1x Paramedic Unit</Text></View>
                </>
              )}
              {request.type === 'Flood' && (
                <>
                  <View style={styles.chip}><Text style={styles.chipText}>🚤 1x Rescue Boat</Text></View>
                  <View style={styles.chip}><Text style={styles.chipText}>🦺 5x Life Jackets</Text></View>
                </>
              )}
              {request.type !== 'Medical' && request.type !== 'Flood' && (
                <>
                  <View style={styles.chip}><Text style={styles.chipText}>🚒 1x Response Team</Text></View>
                  <View style={styles.chip}><Text style={styles.chipText}>📦 1x Relief Kit</Text></View>
                </>
              )}
            </View>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Tracking Timeline</Title>
        <TrackingTimeline 
          status={request.status} 
          assignedTeam={request.assignedTeam} 
          eta={request.eta} 
        />
      </View>

      <View style={styles.actionContainer}>
        {renderActionButtons()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS?.background || '#F8FAFC',
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS?.background || '#F8FAFC',
  },
  errorText: {
    fontSize: 16,
    color: '#64748B',
  },
  card: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#333333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1E293B',
  },
  actionContainer: {
    marginBottom: 40,
  },
  actionButton: {
    paddingVertical: 8,
  },
  resolvedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  resolvedText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS?.success || '#22C55E',
  },
  imagePlaceholder: {
    marginTop: 16,
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed'
  },
  imagePlaceholderText: {
    marginTop: 8,
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500'
  },
  attachedImage: {
    marginTop: 16,
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover'
  },
  aiCard: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    elevation: 0
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginLeft: 8
  },
  aiText: {
    fontSize: 14,
    color: '#1E3A8A',
    marginBottom: 12
  },
  resourceChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE'
  },
  chipText: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '500'
  }
});
