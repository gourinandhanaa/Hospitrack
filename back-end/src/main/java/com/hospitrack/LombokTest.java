package com.hospitrack;

import lombok.Getter;
import lombok.Setter;

public class LombokTest {

    @Getter @Setter
    private String message;

    public static void main(String[] args) {
        LombokTest test = new LombokTest();
        test.setMessage("Hello from Lombok!");
        System.out.println(test.getMessage());
    }
}
