package cn.hjr.bo;

import java.util.List;

public class Pagination<T> {

    private List<T> list;

    private int total;

    Pagination(List<T> list, int total) {
        this.list = list;
        this.total = total;
    }

    public List<T> getList() {
        return list;
    }

    public int getTotal() {
        return total;
    }

    public static <T> Pagination<T> of(List<T> list, int total) {
        return new Pagination<>(list, total);
    }
}
