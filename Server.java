import java.io.*;
import java.net.*;

class Server {
    public static void main(String args[]) throws Exception {
        try {
            String line, newLine;
            ServerSocket ss = new ServerSocket(6789); 
            System.out.println("Server Started...");

            while (true) {
                Socket s = ss.accept();
                System.out.println("Client connected.");

                DataInputStream inp = new DataInputStream(s.getInputStream());
                DataOutputStream out = new DataOutputStream(s.getOutputStream());
                DataInputStream in = new DataInputStream(System.in);

                System.out.println("Press 'q' if you want to exit server");

                while (true) {
                    // Attempt to read from client
                    line = inp.readLine(); 
                    
                    // Check if line is null (client disconnected)
                    if (line == null) {
                        System.out.println("Client disconnected.");
                        break;
                    }

                    System.out.println("Received from client: " + line);

                    newLine = in.readLine();
                    if (newLine.equals("q")) {
                        out.writeBytes("Server is down...\n");
                        s.close();
                        return;
                    } else {
                        out.writeBytes(newLine + "\n"); 
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }
}
