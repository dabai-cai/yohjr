package cn.hjr.service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
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

    @HystrixCommand(fallbackMethod = "backhello")
    public String hiService() {
        return restTemplate.getForObject("http://admin-server/hello",String.class);
    }

    public String backhello(){
        return "断路器生效！";
    }

}
