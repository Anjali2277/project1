import java.io.*;
import java.net.*;

class Client {
    public static void main(String args[]) throws Exception {
        String line, newLine;
        try {
            DataInputStream inp = new DataInputStream(System.in); 
            Socket cs = new Socket("localhost",6789);
            System.out.println("Client Started...");

            DataInputStream inp = new DataInputStream(cs.getInputStream());
            DataOutputStream out = new DataOutputStream(cs.getOutputStream());

            while (true) {
                newLine= in.readLine();
                System.out.println("Sending to Server..."+ newLine);
                out.writeBytes(newLine+"\n");

                if(newLine.equals("q")){
                    System.out.println("Client  is down...");
                    cs.close();
                    return;
                }
                else{
                    line = inp.readLine();
                    System.out.println("Received from Server:"+line);
                }

            }
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }
}
