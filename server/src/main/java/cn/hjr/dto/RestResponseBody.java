package cn.hjr.dto;

public class RestResponseBody<T> {

    private int code;

    private String message;

    private T data;

    static final RestResponseBody<Void> OK = new RestResponseBody<>(0, "ok", null);

    RestResponseBody(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    public static <T> RestResponseBody<T> of(int code, String message) {
        return new RestResponseBody<>(code, message, null);
    }

    public static <T> RestResponseBody<T> of(T data) {
        return new RestResponseBody<>(OK.code, OK.message, data);
    }

    public static RestResponseBody<Void> ok() {
        return OK;
    }
}
