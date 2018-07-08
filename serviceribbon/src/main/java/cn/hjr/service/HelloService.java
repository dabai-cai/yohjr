package cn.hjr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: 大白菜
 * Date: 2018/7/8
 * Time: 23:00
 * Version: 1.0v
 */
@Service
public class HelloService {

    @Autowired
    RestTemplate restTemplate;

    public String hiService() {
        return restTemplate.getForObject("http://localhost:8762/hello",String.class);
    }

}
