"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { BASE_URL, GET_ALL_USER } from "@/ApiCalld/Api";
import { fetcher } from "@/ApiCalld/fetcher";
import Cookie from "cookie-universal";
import BarChartComponent from "@/components/Charts/BarChart";
import LineChartComponent from "@/components/Charts/lineChart";

// دالة لاستخراج مفتاح الشهر والسنة
const getMonthYearKey = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
};

// دالة لتنسيق الشهر والسنة إلى صيغة قصيرة
const formatMonthYear = (key: string) => {
  const [year, month] = key.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
};

// دالة لتوليد نطاق الشهور بين تاريخين
const generateMonthRange = (start: Date, end: Date) => {
  const months = [];
  const date = new Date(start.getFullYear(), start.getMonth(), 1);

  while (date <= end) {
    months.push(getMonthYearKey(date));
    date.setMonth(date.getMonth() + 1);
  }

  return months;
};

// دالة لجلب البيانات من API
const fetchPages = async (token: string, totalPages: number) => {
  const pageRequests = [];
  for (let page = 2; page <= totalPages; page++) {
    pageRequests.push(
      fetch(`${BASE_URL}/${GET_ALL_USER}?page=${page}&pageSize=12`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `Failed to fetch page ${page}, status: ${res.status}`
            );
          }
          return res.json();
        })
        .catch((err) => {
          console.error(err);
          return { data: [] }; // بيانات فارغة في حال حدوث خطأ
        })
    );
  }

  const responses = await Promise.all(pageRequests);
  return responses.reduce((acc, response) => {
    return [...acc, ...response.data];
  }, []);
};

// المكون الرئيسي للصفحة
const Page = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  const { data, error } = useSWR(
    `${BASE_URL}/${GET_ALL_USER}?page=1&pageSize=12`,
    fetcher
  );

  // استخدام useEffect لتحميل البيانات من جميع الصفحات
  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setAllData((prevData) => {
        const newData = data.data.filter(
          (user: any) => !prevData.some((prevUser) => prevUser.id === user.id)
        );
        return [...prevData, ...newData];
      });
    }

    if (data && data.totalPages > 1) {
      const fetchData = async () => {
        const newFetchedData = await fetchPages(token, data.totalPages);
        setAllData((prevData) => {
          const newData = newFetchedData.filter(
            (user: any) => !prevData.some((prevUser) => prevUser.id === user.id)
          );
          return [...prevData, ...newData];
        });
      };

      fetchData();
    }
  }, [data, token]);

  // حساب البيانات الخاصة بالشهور
  useEffect(() => {
    if (allData.length > 0) {
      const dates = allData.map((u) => new Date(u.createdAt));
      const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
      const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

      const monthsRange = generateMonthRange(minDate, maxDate);
      const groupData = allData.reduce((acc, user) => {
        const key = getMonthYearKey(new Date(user.createdAt));
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const finalData = monthsRange.map((key) => ({
        month: formatMonthYear(key),
        users: groupData[key] || 0,
      }));

      setChartData(finalData);
    }
  }, [allData]);

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="grid grid-rows-3 grid-cols-4 gap-3 p-10">
      <div className="col-span-1 row-span-1">
        <div className="min-h-[200px] w-full bg-gray-100 p-4 rounded-lg shadow-md">
          <BarChartComponent data={chartData} />
        </div>
      </div>
      <div className="col-span-1 row-span-1">
        <div className="min-h-[300px] w-full bg-gray-100 p-4 rounded-lg shadow-md">
          <BarChartComponent data={chartData} />
        </div>
      </div>
      <div className="col-span-1 row-span-1">
        <div className="min-h-[300px] w-full bg-gray-100 p-4 rounded-lg shadow-md">
          <BarChartComponent data={chartData} />
        </div>
      </div>
      <div className="col-span-1 row-span-1">
        <div className="min-h-[300px] w-full bg-gray-100 p-4 rounded-lg shadow-md">
          <BarChartComponent data={chartData} />
        </div>
      </div>
      <div className="col-span-1 row-span-1">
        <div className="min-h-[300px] w-full bg-gray-100 p-4 rounded-lg shadow-md">
          <BarChartComponent data={chartData} />
        </div>
      </div>

      <div className="col-span-3 row-span-2">
        <div className="min-h-[200px] w-full bg-gray-100 p-4 rounded-lg shadow-md">
          <LineChartComponent Data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Page;
