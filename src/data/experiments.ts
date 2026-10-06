export interface AlgorithmStep {
  number: number;
  text: string;
  substeps?: string[];
}

export interface ExperimentData {
  id: string;
  number: number;
  navTitle: string;
  badge: string;
  protocol: 'TCP' | 'UDP';
  title: string;
  aim: string;
  algorithm: {
    server: AlgorithmStep[];
    client: AlgorithmStep[];
  };
  files: {
    filename: string;
    role: 'Server' | 'Client';
    code: string;
  }[];
  terminals: {
    label: string;
    role: 'Server' | 'Client';
    content: string;
  }[];
  howToRunNote: string;
  result: string;
  quickReview?: {
    socketType: string;
    functionsUsed: string[];
    protocolDetails: string;
    port: number;
    keyConcept: string;
  };
}

export const EXPERIMENTS: ExperimentData[] = [
  {
    id: 'program-5',
    number: 5,
    navTitle: 'Program 5 – TCP Matrix Type',
    badge: 'Program 05 · Connection-Oriented TCP',
    protocol: 'TCP',
    title: 'SECTION 1 — PROGRAM 5: TCP Client–Server Matrix Type Identification',
    aim: 'The client inputs an integer N and creates a square matrix of order N by populating it with random numbers in the range (1, 50). It then sends the matrix to the server, which identifies the matrix type. The server informs the client of the type, and the client prints it.',
    algorithm: {
      server: [
        { number: 1, text: 'Start' },
        { number: 2, text: 'Create a TCP socket using socket()' },
        {
          number: 3,
          text: 'Initialize the server address structure:',
          substeps: [
            'Set address family to AF_INET',
            'Set IP address to INADDR_ANY',
            'Set port number to 8080'
          ]
        },
        { number: 4, text: 'Bind the socket to the specified address using bind()' },
        { number: 5, text: 'Put the socket into listening mode using listen()' },
        { number: 6, text: 'Display "Waiting for client connection..."' },
        { number: 7, text: 'Accept a client connection using accept()' },
        { number: 8, text: 'Receive the order of the matrix n from the client' },
        { number: 9, text: 'Receive the matrix from the client using read()' },
        { number: 10, text: 'Initialize upper = 1, lower = 1, diagonal = 1' },
        {
          number: 11,
          text: 'Traverse the matrix using nested loops:',
          substeps: [
            'If i > j and element is non-zero, set upper = 0',
            'If i < j and element is non-zero, set lower = 0',
            'If i != j and element is non-zero, set diagonal = 0'
          ]
        },
        { number: 12, text: 'Determine the matrix type' },
        { number: 13, text: 'Send the result string to the client using write()' },
        { number: 14, text: 'Display the matrix type sent' },
        { number: 15, text: 'Close the client socket' },
        { number: 16, text: 'Close the server socket' },
        { number: 17, text: 'Stop' }
      ],
      client: [
        { number: 1, text: 'Start' },
        { number: 2, text: 'Create a TCP socket using socket()' },
        {
          number: 3,
          text: 'Initialize the server address structure:',
          substeps: [
            'Set address family to AF_INET',
            'Set port number and IP address'
          ]
        },
        { number: 4, text: 'Connect to the server using connect()' },
        { number: 5, text: 'Read the order of the matrix n from the user' },
        { number: 6, text: 'Initialize the random number generator using srand(time(0))' },
        {
          number: 7,
          text: 'Generate an n x n matrix:',
          substeps: [
            'For each element generate a random number between 1 and 50',
            'Store the value in the matrix and display the matrix'
          ]
        },
        { number: 8, text: 'Send the matrix order n to the server using write()' },
        { number: 9, text: 'Send the generated matrix to the server using write()' },
        { number: 10, text: 'Receive the matrix type result from the server using read()' },
        { number: 11, text: 'Display the received matrix type' },
        { number: 12, text: 'Close the socket connection' },
        { number: 13, text: 'Stop' }
      ]
    },
    files: [
      {
        filename: 'server.c',
        role: 'Server',
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080
#define MAX 20

int main()
{
    int server_fd, new_socket;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    int n, matrix[MAX][MAX];
    char result[50];

    server_fd = socket(AF_INET, SOCK_STREAM, 0);

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    bind(server_fd, (struct sockaddr *)&address, sizeof(address));
    listen(server_fd, 3);

    printf("Waiting for client connection...\\n");

    new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t *)&addrlen);

    read(new_socket, &n, sizeof(int));
    read(new_socket, matrix, sizeof(matrix));

    int upper = 1, lower = 1, diagonal = 1;

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            if (i > j && matrix[i][j] != 0)
                upper = 0;
            if (i < j && matrix[i][j] != 0)
                lower = 0;
            if (i != j && matrix[i][j] != 0)
                diagonal = 0;
        }
    }

    if (diagonal)
        strcpy(result, "Diagonal Matrix");
    else if (upper)
        strcpy(result, "Upper Triangular Matrix");
    else if (lower)
        strcpy(result, "Lower Triangular Matrix");
    else
        strcpy(result, "Neither Upper nor Lower nor Diagonal");

    write(new_socket, result, sizeof(result));
    printf("Matrix Type Sent to Client: %s\\n", result);

    close(new_socket);
    close(server_fd);
    return 0;
}`
      },
      {
        filename: 'client.c',
        role: 'Client',
        code: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080
#define MAX 20

int main()
{
    int sock = 0;
    struct sockaddr_in serv_addr;
    int n, matrix[MAX][MAX];
    char result[50];

    sock = socket(AF_INET, SOCK_STREAM, 0);

    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);
    inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr);

    connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr));

    printf("Enter order of matrix: ");
    scanf("%d", &n);

    srand(time(0));
    printf("\\nGenerated Matrix:\\n");

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            matrix[i][j] = rand() % 50 + 1;
            printf("%4d", matrix[i][j]);
        }
        printf("\\n");
    }

    write(sock, &n, sizeof(int));
    write(sock, matrix, sizeof(matrix));
    read(sock, result, sizeof(result));

    printf("\\nMatrix Type Received from Server: %s\\n", result);

    close(sock);
    return 0;
}`
      }
    ],
    terminals: [
      {
        label: 'Terminal 1 – Server',
        role: 'Server',
        content: `pglab@pglab-HP-Pro-Tower-280-G9-E-PCI-Desktop-PC:~/Desktop/CSE$ gcc server.c
pglab@pglab-HP-Pro-Tower-280-G9-E-PCI-Desktop-PC:~/Desktop/CSE$ ./a.out
Waiting for client connection...
Matrix Type Sent to Client: Neither Upper nor Lower nor Diagonal`
      },
      {
        label: 'Terminal 2 – Client',
        role: 'Client',
        content: `pglab@pglab-HP-Pro-Tower-280-G9-E-PCI-Desktop-PC:~/Desktop/CSE$ gcc client.c
pglab@pglab-HP-Pro-Tower-280-G9-E-PCI-Desktop-PC:~/Desktop/CSE$ ./a.out
Enter order of matrix: 3

Generated Matrix:
   8  16   2
  21  33  14
   9  48  32

Matrix Type Received from Server: Neither Upper nor Lower nor Diagonal`
      }
    ],
    howToRunNote: 'How to run: compile and run the server first in Terminal 1, then the client in Terminal 2.',
    result: 'The client generated a random matrix of the given order and sent it to the server over TCP. The server identified the matrix type and returned it, and the client displayed it.',
    quickReview: {
      socketType: 'SOCK_STREAM (TCP / Stream Socket)',
      functionsUsed: ['socket()', 'bind()', 'listen()', 'accept()', 'connect()', 'read()', 'write()', 'inet_pton()'],
      protocolDetails: 'Connection-oriented, reliable, 3-way handshake before data transfer.',
      port: 8080,
      keyConcept: 'Matrix verification logic: (i > j && non-zero → not upper), (i < j && non-zero → not lower), (i != j && non-zero → not diagonal).'
    }
  },
  {
    id: 'program-8',
    number: 8,
    navTitle: 'Program 8 – UDP Time Server',
    badge: 'Program 08 · Connectionless UDP',
    protocol: 'UDP',
    title: 'SECTION 2 — PROGRAM 8: Concurrent Time Server Application (UDP)',
    aim: 'A concurrent time server application using UDP to execute the program at a remote server. The client sends a time request to the server, which sends its system time back. The client then displays the received time value.',
    algorithm: {
      server: [
        { number: 1, text: 'Start' },
        { number: 2, text: 'Create a UDP socket using socket(AF_INET, SOCK_DGRAM, 0)' },
        {
          number: 3,
          text: 'Initialize the server address structure:',
          substeps: [
            'Set address family to AF_INET',
            'Set IP address to INADDR_ANY',
            'Set port number to 8080'
          ]
        },
        { number: 4, text: 'Bind the server address using bind()' },
        { number: 5, text: 'Display "UDP Time Server Running..."' },
        { number: 6, text: 'Enter an infinite loop' },
        { number: 7, text: 'Wait for a request from the client using recvfrom()' },
        {
          number: 8,
          text: 'When a request is received:',
          substeps: [
            'Obtain the current system time using time()',
            'Convert the time into a readable string format using ctime() and copy the formatted time into the buffer'
          ]
        },
        { number: 9, text: 'Send the current date and time back to the client using sendto()' },
        { number: 10, text: 'Repeat steps 7–9 for every client request' },
        { number: 11, text: 'Close the socket when the server terminates' },
        { number: 12, text: 'Stop' }
      ],
      client: [
        { number: 1, text: 'Start' },
        { number: 2, text: 'Create a UDP socket using socket(AF_INET, SOCK_DGRAM, 0)' },
        {
          number: 3,
          text: 'Initialize the server address structure:',
          substeps: [
            'Set address family to AF_INET',
            'Set port number to 8080',
            'Set server IP address to 127.0.0.1'
          ]
        },
        { number: 4, text: 'Store the request message "TIME" in a buffer' },
        { number: 5, text: 'Send the request message to the server using sendto()' },
        { number: 6, text: 'Wait for the server\'s response using recvfrom()' },
        { number: 7, text: 'Receive the current date and time from the server' },
        { number: 8, text: 'Display the received time on the screen' },
        { number: 9, text: 'Close the socket' },
        { number: 10, text: 'Stop' }
      ]
    },
    files: [
      {
        filename: 'timeserver.c',
        role: 'Server',
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <time.h>

#define PORT 8080
#define BUFFER_SIZE 1024

int main()
{
    int sockfd;
    char buffer[BUFFER_SIZE];
    struct sockaddr_in server_addr, client_addr;
    socklen_t len;

    sockfd = socket(AF_INET, SOCK_DGRAM, 0);

    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT);

    bind(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr));

    printf("UDP Time Server Running...\\n");

    while (1)
    {
        len = sizeof(client_addr);
        recvfrom(sockfd, buffer, BUFFER_SIZE, 0, (struct sockaddr *)&client_addr, &len);

        time_t current_time;
        time(&current_time);
        strcpy(buffer, ctime(&current_time));

        sendto(sockfd, buffer, strlen(buffer), 0, (struct sockaddr *)&client_addr, len);
    }

    close(sockfd);
    return 0;
}`
      },
      {
        filename: 'timeclient.c',
        role: 'Client',
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080
#define BUFFER_SIZE 1024

int main()
{
    int sockfd;
    char buffer[BUFFER_SIZE] = "TIME";
    struct sockaddr_in server_addr;
    socklen_t len;

    sockfd = socket(AF_INET, SOCK_DGRAM, 0);

    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");

    sendto(sockfd, buffer, strlen(buffer), 0, (struct sockaddr *)&server_addr, sizeof(server_addr));

    len = sizeof(server_addr);
    recvfrom(sockfd, buffer, BUFFER_SIZE, 0, (struct sockaddr *)&server_addr, &len);

    printf("Server Time: %s\\n", buffer);

    close(sockfd);
    return 0;
}`
      }
    ],
    terminals: [
      {
        label: 'Terminal 1 – Server',
        role: 'Server',
        content: `pglab@pglab-HP-Pro-Tower-280-G9-E-PCI-Desktop-PC:~/Desktop/CSE$ gcc timeserver.c
pglab@pglab-HP-Pro-Tower-280-G9-E-PCI-Desktop-PC:~/Desktop/CSE$ ./a.out
UDP Time Server Running...`
      },
      {
        label: 'Terminal 2 – Client',
        role: 'Client',
        content: `pglab@pglab-HP-Pro-Tower-280-G9-E-PCI-Desktop-PC:~/Desktop/CSE$ gcc timeclient.c
pglab@pglab-HP-Pro-Tower-280-G9-E-PCI-Desktop-PC:~/Desktop/CSE$ ./a.out
Server Time: Thu Jun 18 11:18:36 2026`
      }
    ],
    howToRunNote: 'How to run: compile and run the server first in Terminal 1, then the client in Terminal 2.',
    result: 'The concurrent UDP time server was successfully implemented. The client sent a time request, and the server returned its system time, which was displayed by the client.',
    quickReview: {
      socketType: 'SOCK_DGRAM (UDP / Datagram Socket)',
      functionsUsed: ['socket()', 'bind()', 'sendto()', 'recvfrom()', 'time()', 'ctime()', 'inet_addr()'],
      protocolDetails: 'Connectionless, no listen() or accept() required, naturally handles concurrent requests statelessly.',
      port: 8080,
      keyConcept: 'Concurrent handling: Because UDP is stateless datagram based, the server loops on recvfrom(), captures client_addr & len, and replies to whoever asks without maintaining persistent connection states.'
    }
  }
];
