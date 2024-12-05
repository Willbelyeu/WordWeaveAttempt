import java.util.*;

public class subjectMatchwords {
    // A list to hold all the sets
    private List<Map.Entry<String, List<String>>> sets;

    // Constructor to initialize the 12 sets
    public subjectMatchwords() {
        sets = new ArrayList<>();

        // Adding 12 sets
        addSet("Marvel Characters", Arrays.asList("Tony Stark", "Bruce Banner", "Loki", "Nick Fury"));
        addSet("Fruits", Arrays.asList("Apple", "Banana", "Cherry", "Orange"));
        addSet("Car Brands", Arrays.asList("Toyota", "Ford", "Honda", "Tesla"));
        addSet("Programming Languages", Arrays.asList("Java", "Python", "C++", "JavaScript"));
        addSet("Planets", Arrays.asList("Mercury", "Venus", "Earth", "Mars"));
        addSet("Types of Music", Arrays.asList("Jazz", "Rock", "Classical", "Hip-Hop"));
        addSet("Sports", Arrays.asList("Soccer", "Basketball", "Tennis", "Baseball"));
        addSet("Dog Breeds", Arrays.asList("Labrador", "Poodle", "Bulldog", "Beagle"));
        addSet("Colors", Arrays.asList("Red", "Blue", "Green", "Yellow"));
        addSet("Countries", Arrays.asList("USA", "Canada", "Brazil", "India"));
        addSet("Board Games", Arrays.asList("Chess", "Monopoly", "Scrabble", "Clue"));
        addSet("Cities", Arrays.asList("New York", "Paris", "Tokyo", "Sydney"));
    }

    // Method to add a set
    private void addSet(String subject, List<String> matchwords) {
        sets.add(new AbstractMap.SimpleEntry<>(subject, matchwords));
    }

    // Method to return 4 random sets
    public List<Map.Entry<String, List<String>>> returnSets() {
        if (sets.size() < 4) {
            throw new IllegalStateException("Not enough sets to select 4");
        }
        Collections.shuffle(sets); // Shuffle the sets to randomize
        return sets.subList(0, 4); // Return the first 4 sets
    }

    // Main method for testing
    public static void main(String[] args) {
        subjectMatchwords sm = new subjectMatchwords();
        List<Map.Entry<String, List<String>>> randomSets = sm.returnSets();

        // Print the selected sets
        for (Map.Entry<String, List<String>> set : randomSets) {
            System.out.println("Subject: " + set.getKey());
            System.out.println("Matchwords: " + set.getValue());
            System.out.println();
        }
    }
}
