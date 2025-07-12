import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors.jsx';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { SignOutButton } from '../../components/SignOutButton';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useUser();

  return (
    <>
      <SignedIn>
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.header}>
            <Text style={[styles.welcomeText, { color: colors.text }]}>
              Welcome to PlanUp
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              Your project management companion
            </Text>
            {user && (
              <Text style={[styles.userEmail, { color: colors.text }]}>
                Signed in as: {user.primaryEmailAddress?.emailAddress}
              </Text>
            )}
          </View>

          <View style={styles.quickActions}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Quick Actions
            </Text>
            
            <View style={styles.actionGrid}>
              <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.white, borderColor: colors.blue }]}>
                <Ionicons name="add-circle" size={32} color={colors.coral} />
                <Text style={[styles.actionText, { color: colors.text }]}>Create Issue</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.white, borderColor: colors.blue }]}>
                <Ionicons name="search" size={32} color={colors.coral} />
                <Text style={[styles.actionText, { color: colors.text }]}>Search</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.white, borderColor: colors.blue }]}>
                <Ionicons name="calendar" size={32} color={colors.coral} />
                <Text style={[styles.actionText, { color: colors.text }]}>Sprint</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.white, borderColor: colors.blue }]}>
                <Ionicons name="analytics" size={32} color={colors.coral} />
                <Text style={[styles.actionText, { color: colors.text }]}>Reports</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.recentActivity}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Activity
            </Text>
            
            <View style={[styles.activityCard, { backgroundColor: colors.white }]}>
              <View style={styles.activityItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.coral} />
                <Text style={[styles.activityText, { color: colors.text }]}>
                  Issue "Fix login bug" moved to Done
                </Text>
              </View>
              
              <View style={styles.activityItem}>
                <Ionicons name="person-add" size={20} color={colors.blue} />
                <Text style={[styles.activityText, { color: colors.text }]}>
                  John Doe assigned to "Dashboard redesign"
                </Text>
              </View>
              
              <View style={styles.activityItem}>
                <Ionicons name="create" size={20} color={colors.coral} />
                <Text style={[styles.activityText, { color: colors.text }]}>
                  New issue "Mobile app testing" created
                </Text>
              </View>
            </View>
          </View>

          <SignOutButton />
        </ScrollView>
      </SignedIn>

      <SignedOut>
        <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[styles.welcomeText, { color: colors.text, textAlign: 'center' }]}>
            Welcome to PlanUp
          </Text>
          <Text style={[styles.subtitle, { color: colors.text, textAlign: 'center', marginBottom: 32 }]}>
            Your project management companion
          </Text>
          <View style={styles.authButtons}>
            <Link href="/sign-in" asChild>
              <TouchableOpacity style={[styles.authButton, { backgroundColor: colors.blue }]}>
                <Text style={styles.authButtonText}>Sign In</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/sign-up" asChild>
              <TouchableOpacity style={[styles.authButton, { backgroundColor: colors.coral }]}>
                <Text style={styles.authButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </SignedOut>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 8,
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  recentActivity: {
    padding: 20,
  },
  activityCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityText: {
    marginLeft: 12,
    fontSize: 14,
    flex: 1,
  },
  authButtons: {
    width: '100%',
    paddingHorizontal: 20,
  },
  authButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  authButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
