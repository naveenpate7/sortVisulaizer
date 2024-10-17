#include <bits/stdc++.h>
using namespace std;

// Node structure
struct Node {
    int data;
    Node *next = nullptr;
    Node(int val) {
        data = val;
        next = nullptr;
    }
};

// Function to create the linked list
Node *makeLinkedList(Node *root, int data) {
    Node *temp = root;
    if (root == nullptr) {
        root = new Node(data);
        return root;
    } else {
        while (root->next != nullptr) {
            root = root->next;
        }
        root->next = new Node(data);
    }
    return temp;
}

// Function to print the linked list
void printLinkedList(Node *root) {
    Node *temp = root;
    while (temp != nullptr) {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;
}

// Function to reverse a portion of the linked list
Node *reverseLinkedList(Node *start, Node *end) {
    Node *prev = nullptr, *curr = start;
    while (curr != end->next) {
        Node *newnode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = newnode;
    }
    return prev;
}

int main() {
    Node *root = nullptr;
    cout << "Enter the k value: ";
    int n;
    cin >> n;

    // Create a linked list with values 1 to 10
    for (int i = 1; i <= 10; i++) {
        root = makeLinkedList(root, i);
    }

    // Print the original linked list
    printLinkedList(root);

    int count = 0;
    Node *temp = root;
    Node *start = root, *end = root;
    Node *leftSide = nullptr;

    // Traverse the linked list
    while (temp != nullptr) {
        count++;
        if (count == n) {
            // Reverse from 'start' to 'temp'
            Node *newnode = temp->next; // Right side node
            Node *returnNode = reverseLinkedList(start, temp); // Reverse and return the head

            if (start == root) {
                root = returnNode; // Update root if start is root
                leftSide = start;
            } else {
                leftSide->next = returnNode; // Reconnect leftSide to the reversed part
            }

            // Connect the remaining part
            start->next = newnode;
            temp = newnode;
            count = 0;
            start = newnode;
        } else {
            temp = temp->next;
        }
    }

    // Print the final modified linked list
    printLinkedList(root);

    return 0;
}
