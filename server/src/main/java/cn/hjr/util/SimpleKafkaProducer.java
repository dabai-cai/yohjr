package cn.hjr.util;

import java.util.Properties;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.config.Config;
import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: 大白菜
 * Date: 2018/7/29
 * Time: 13:35
 * Version: 1.0v
 */
public class SimpleKafkaProducer {

    public static void main(String[] args) {


        Properties props = new Properties();

        //broker地址
        props.put("bootstrap.servers", "hadoop05:9092,hadoop06:9092,hadoop07:9092");

        //请求时候需要验证
        props.put("acks", "all");

        //请求失败时候需要重试
        props.put("retries", 0);

        //内存缓存区大小
        props.put("buffer.memory", 33554432);

        //指定消息key序列化方式
        props.put("key.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");

        //指定消息本身的序列化方式
        props.put("value.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");

        Producer<String, String> producer = new KafkaProducer<>(props);

        for (int i = 0; i < 1000000; i++)
            producer.send(new ProducerRecord<>("leslie", Integer.toString(i), "This is message,请留言"));
        producer.close();
    }
}